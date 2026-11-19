import { useEffect, useState } from 'react'
import { obtenerPanelEstadias, registrarEntrada, registrarSalida } from '../../features/estacionamiento/services/estacionamientoApi.js'
import { moneda } from './formatos.js'
import { admiteVehiculo } from './compatibilidadPlazas.js'

export default function useEstadias() {
  const [panel, setPanel] = useState({ resumen: {}, plazas: [], clientes: [], tarifas: [], movimientos: [] })
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [ahora, setAhora] = useState(() => Date.now())
  const [tipo, setTipo] = useState('AUTO')
  const [formulario, setFormulario] = useState({ patente: '', plazaId: '', tarifaId: '', clienteId: '' })

  async function cargarPanel(signal) {
    const datos = await obtenerPanelEstadias(signal)
    setPanel(datos)
    setFormulario((actual) => ({
      ...actual,
      plazaId: datos.plazas.find((plaza) => plaza.estado === 'libre' && admiteVehiculo(plaza.tipoPermitido, tipo))?.id?.toString() ?? '',
      tarifaId: actual.tarifaId || datos.tarifas[0]?.id?.toString() || '',
    }))
  }

  useEffect(() => {
    const controller = new AbortController()
    obtenerPanelEstadias(controller.signal)
      .then((datos) => {
        setPanel(datos)
        setFormulario((actual) => ({
          ...actual,
          plazaId: datos.plazas.find((plaza) => plaza.estado === 'libre' && admiteVehiculo(plaza.tipoPermitido, 'AUTO'))?.id?.toString() ?? '',
          tarifaId: datos.tarifas[0]?.id?.toString() || '',
        }))
      })
      .catch((exception) => {
        if (exception.name !== 'AbortError') setError(exception.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargando(false)
      })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const intervalo = window.setInterval(() => setAhora(Date.now()), 10000)
    return () => window.clearInterval(intervalo)
  }, [])

  const plazasDisponibles = panel.plazas.filter((plaza) => plaza.estado === 'libre' && admiteVehiculo(plaza.tipoPermitido, tipo))
  const puedeRegistrar = Boolean(formulario.patente.trim() && formulario.plazaId && formulario.tarifaId && formulario.clienteId)

  function editarCampo(campo, valor) {
    setFormulario((actual) => ({ ...actual, [campo]: valor }))
  }

  function cambiarTipo(nuevoTipo) {
    setTipo(nuevoTipo)
    const primeraPlaza = panel.plazas.find((plaza) => plaza.estado === 'libre' && admiteVehiculo(plaza.tipoPermitido, nuevoTipo))
    setFormulario((actual) => ({ ...actual, plazaId: primeraPlaza?.id?.toString() ?? '' }))
  }

  async function confirmarIngreso(event) {
    event.preventDefault()
    if (!puedeRegistrar || guardando) return

    try {
      setGuardando(true)
      setError('')
      setAviso('')
      await registrarEntrada({
        patente: formulario.patente.trim().toUpperCase(),
        tipo,
        plazaId: Number(formulario.plazaId),
        tarifaId: Number(formulario.tarifaId),
        clienteId: Number(formulario.clienteId),
      })
      setFormulario((actual) => ({ ...actual, patente: '' }))
      await cargarPanel()
    } catch (exception) {
      setError(exception.message)
    } finally {
      setGuardando(false)
    }
  }

  async function confirmarSalida(plazaId) {
    try {
      setGuardando(true)
      setError('')
      setAviso('')
      const resultado = await registrarSalida(plazaId)
      const numeroPlaza = panel.plazas.find((plaza) => plaza.id === plazaId)?.numero
      setAviso(`Cobro registrado: ${moneda.format(Number(resultado.estadia.monto))}. La plaza P${String(numeroPlaza).padStart(2, '0')} quedó libre.`)
      await cargarPanel()
    } catch (exception) {
      setError(exception.message)
    } finally {
      setGuardando(false)
    }
  }

  return {
    panel,
    cargando,
    guardando,
    error,
    setError,
    aviso,
    setAviso,
    ahora,
    tipo,
    formulario,
    plazasDisponibles,
    puedeRegistrar,
    editarCampo,
    cambiarTipo,
    confirmarIngreso,
    confirmarSalida,
  }
}
