SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "-03:00";
--
-- Database: `inventario`
--
-- --------------------------------------------------------
--
-- Table structure for table `admins`
--
CREATE TABLE `operario` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
-- --------------------------------------------------------
--
-- Table structure for table `tipo_articulo`
--
CREATE TABLE `tipo_articulo` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `descripcion` varchar(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
-- --------------------------------------------------------
--
-- Table structure for table `ubicacion`
--
CREATE TABLE `ubicacion` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `descripcion` varchar(150) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
-- --------------------------------------------------------
--
-- Table structure for table `proveedor`
--
CREATE TABLE `proveedor` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(80),
  `telefono` varchar(50),
  `direccion` varchar(80),
  `ciudad` varchar(80),
  `codigo_postal` varchar(10),
  `persona_contacto` varchar(50),
  `observaciones` varchar(254),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
-- --------------------------------------------------------
--
-- Table structure for table `info_articulo`
--
CREATE TABLE `info_articulo` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `codbar` varchar(50),
  `tipo` int,
  `marca` varchar(50),
  `modelo` varchar(80),
  `observaciones` varchar(254),
  `tamano` varchar(150),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
-- --------------------------------------------------------
--
-- Table structure for table `remito`
--
CREATE TABLE `remito` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `articulo_id` int NOT NULL,
  `fecha_ingreso` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `nro_remito` varchar(80),
  `proveedor_` int NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
-- --------------------------------------------------------
--
-- Table structure for table `articulo`
--
CREATE TABLE `articulo` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `codbar` varchar(50),
  `descripcion` varchar(50),
  `nombre` varchar(50),
  `operario_ingreso` int NOT NULL,
  `operario_retiro` int,
  `fecha_alta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_baja` timestamp,
  `subconjunto` int,
  `ubicacion_almacen` int,
  `proveedor_` int,
  `destino` varchar(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
-- -------------------------------------------------------
ALTER TABLE `info_articulo`
ADD INDEX (`codbar`);
--
ALTER TABLE `info_articulo`
  ADD FOREIGN KEY (`tipo`) REFERENCES `tipo_articulo`(`id`);
-- -------------------------------------------------------
ALTER TABLE `remito`
ADD FOREIGN KEY (`articulo_id`) REFERENCES `articulo`(`id`),
  ADD FOREIGN KEY (`proveedor_`) REFERENCES `proveedor`(`id`);
-- -------------------------------------------------------
ALTER TABLE `articulo`
ADD FOREIGN KEY (`operario_ingreso`) REFERENCES `operario`(`id`),
  ADD FOREIGN KEY (`operario_retiro`) REFERENCES `operario`(`id`),
  ADD FOREIGN KEY (`codbar`) REFERENCES `info_articulo`(`codbar`),
  ADD FOREIGN KEY (`subconjunto`) REFERENCES `articulo`(`id`),
  ADD FOREIGN KEY (`ubicacion_almacen`) REFERENCES `ubicacion`(`id`),
  ADD FOREIGN KEY (`proveedor_`) REFERENCES `proveedor`(`id`);
-- -------------------------------------------------------
INSERT INTO `ubicacion` (`id`, `descripcion`) VALUES
(1, 'RACK'),
(2, 'ALMACEN'),
(3, 'LIBRE'),
(4, 'EN USO');
--    
INSERT INTO `tipo_articulo` (`id`, `descripcion`) VALUES
(1, 'INSUMOS'),
(2, 'HERRAMIENTAS'),
(3, 'MANUFACTURA'),
(4, 'REPUESTOS');
--
INSERT INTO `info_articulo` (`codbar`, `tipo`, `marca`, `modelo`, `observaciones`, `tamano`) VALUES
(111, 1, 'SKF', 'ROD111', 'Para repuesto / rueda eje trasero', '11x11'),
(122, 1, 'SKF', 'ROD122', 'Pedido de xxx', '12x12'),
(123, 2, 'BHACO', 'LLAVE INGLESA', '', '13x13');
-- -------------------------------------------------------
COMMIT;