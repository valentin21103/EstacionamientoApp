-- CreateEnum
CREATE TYPE "TipoVehiculo" AS ENUM ('AUTO', 'MOTO', 'CAMIONETA');

-- CreateEnum
CREATE TYPE "EstadoPlaza" AS ENUM ('LIBRE', 'OCUPADA');

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "telefono" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehiculo" (
    "id" SERIAL NOT NULL,
    "patente" TEXT NOT NULL,
    "tipo" "TipoVehiculo" NOT NULL,
    "marca" TEXT,
    "modelo" TEXT,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plaza" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "estado" "EstadoPlaza" NOT NULL DEFAULT 'LIBRE',
    "tipoPermitido" "TipoVehiculo",
    "vehiculoId" INTEGER,

    CONSTRAINT "Plaza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarifa" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precioPorHora" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Tarifa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estadia" (
    "id" SERIAL NOT NULL,
    "vehiculoId" INTEGER NOT NULL,
    "plazaId" INTEGER NOT NULL,
    "tarifaId" INTEGER NOT NULL,
    "fechaEntrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaSalida" TIMESTAMP(3),
    "monto" DECIMAL(10,2),

    CONSTRAINT "Estadia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_documento_key" ON "Cliente"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_patente_key" ON "Vehiculo"("patente");

-- CreateIndex
CREATE UNIQUE INDEX "Plaza_numero_key" ON "Plaza"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Plaza_vehiculoId_key" ON "Plaza"("vehiculoId");

-- AddForeignKey
ALTER TABLE "Vehiculo" ADD CONSTRAINT "Vehiculo_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plaza" ADD CONSTRAINT "Plaza_vehiculoId_fkey" FOREIGN KEY ("vehiculoId") REFERENCES "Vehiculo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estadia" ADD CONSTRAINT "Estadia_vehiculoId_fkey" FOREIGN KEY ("vehiculoId") REFERENCES "Vehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estadia" ADD CONSTRAINT "Estadia_plazaId_fkey" FOREIGN KEY ("plazaId") REFERENCES "Plaza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estadia" ADD CONSTRAINT "Estadia_tarifaId_fkey" FOREIGN KEY ("tarifaId") REFERENCES "Tarifa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
