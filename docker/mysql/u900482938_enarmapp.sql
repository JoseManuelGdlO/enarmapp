-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 27-11-2024 a las 15:38:22
-- Versión del servidor: 10.11.9-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u900482938_enarmapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `account_estatus`
--

CREATE TABLE `account_estatus` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `estatus` int(11) NOT NULL COMMENT '3 estatus.- nuevo = 0, prueba = 3, corriente=1, vencido=99, cancelado=88'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `account_estatus`
--

INSERT INTO `account_estatus` (`id`, `idUsuario`, `estatus`) VALUES
(1, 11, 1),
(2, 12, 3),
(3, 16, 1),
(4, 1, 99),
(5, 2, 99),
(6, 3, 3),
(7, 6, 99),
(8, 8, 1),
(9, 20, 0),
(10, 21, 0),
(11, 22, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caso_clinico`
--

CREATE TABLE `caso_clinico` (
  `id` int(11) NOT NULL,
  `idSubcategoria` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` longtext NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `isEspanol` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `caso_clinico`
--

INSERT INTO `caso_clinico` (`id`, `idSubcategoria`, `nombre`, `descripcion`, `imagen`, `isEspanol`) VALUES
(1, 4, '', 'Un hombre de 52 años con hipertensión acude al médico debido a la micción frecuente y al aumento de la sed. Bebe 4 onzas de alcohol al día y ha fumado 1 paquete de cigarrillos al día durante los últimos 30 años . Mide 180 cm ( 5 pies 10 pulgadas ) de altura y pesa 106 kg ( 233 libras ); El IMC es de 33 kg/m 2 . Su presión arterial es de 130/80 mm Hg . Los estudios de laboratorio muestran una hemoglobina A 1c de 8,5% . ', 'img.9899', 1),
(14, 4, 'caso 1', 'undefined', 'qwadas', 1),
(15, 4, 'caso 1', 'undefined', 'qwadas', 1),
(16, 4, 'caso 1', 'undefined', 'qwadas', 1),
(17, 5, 'we', 'PHA+PHN0cm9uZyBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAxMDIpOyBjb2xvcjogcmdiKDI1NSwgMTk0LCAxMDIpOyI+PGVtPmFhc2Rhc2Rhc2Q8L2VtPjwvc3Ryb25nPjwvcD4=', '', 1),
(18, 7, 'sdfsd', 'PHA+ZXdycXdlPC9wPg==', '[object Object]', 0),
(19, 7, 'sdfsd', 'PHA+ZXdycXdlPC9wPg==', '[object Object]', 0),
(32, 6, 'errtwe', 'PHA+d2Vyd2VydzwvcD4=', 'https://enrm-dev-images.s3.amazonaws.com/undefined_1695687474837', 0),
(33, 6, 'errtwe', 'PHA+d2Vyd2VydzwvcD4=', 'https://enrm-dev-images.s3.amazonaws.com/errtwe_1695687617946.gif', 0),
(34, 6, 'errtwe', 'PHA+d2Vyd2VydzwvcD4=', 'https://enrm-dev-images.s3.amazonaws.com/errtwe_1695687728728.gif', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `categoria`) VALUES
(11, 'Medicina Interna'),
(12, 'Cirugía'),
(13, 'Pediatría'),
(14, 'Medicina Familiar'),
(15, 'Ginecología y Obstetricia'),
(19, 'Cancerologia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configs`
--

CREATE TABLE `configs` (
  `id` int(11) NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `grupo` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `valor` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `configs`
--

INSERT INTO `configs` (`id`, `codigo`, `grupo`, `tipo`, `valor`, `descripcion`) VALUES
(1, 'EXAM_DATE', 'EXAM_2', 'string', '12/25/2023', 'dia dle examen'),
(2, 'EXAM_LOCATE', 'EXAM', 'boolean', 'true', 'boolean test'),
(3, 'TEST_DAYS', 'EXAM', 'number', '5', 'test'),
(4, 'TEST_YAER', 'EXAM', 'number', '2023', 'test añño');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`id`, `nombre`) VALUES
(1, 'ANESTESIOLOGÍA'),
(2, 'CIRUGÍA VASCULAR'),
(3, 'AUDIOLOGÍA/OTONEUROLOGÍA'),
(4, 'CARDIOLOGÍA'),
(5, 'CIRUGÍA GENERAL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examen`
--

CREATE TABLE `examen` (
  `id` int(11) NOT NULL,
  `idTipo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `dificultad` int(11) NOT NULL,
  `numeroPreguntas` int(4) NOT NULL,
  `isEspanol` tinyint(1) NOT NULL,
  `creationDate` date DEFAULT NULL,
  `study_mode` int(1) NOT NULL COMMENT 'modo estuid = 1, modo simulacion =2',
  `simulation` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `examen`
--

INSERT INTO `examen` (`id`, `idTipo`, `idUsuario`, `dificultad`, `numeroPreguntas`, `isEspanol`, `creationDate`, `study_mode`, `simulation`) VALUES
(3, 1, 12, 12, 4, 1, '2022-12-15', 1, 0),
(4, 1, 12, 12, 4, 1, '2023-02-14', 0, 0),
(5, 1, 3, 12, 4, 1, NULL, 0, 0),
(6, 1, 12, 12, 11, 1, '0000-00-00', 0, 0),
(7, 1, 12, 12, 11, 1, '2023-09-01', 1, 0),
(8, 1, 12, 12, 11, 1, '2023-09-01', 0, 0),
(9, 1, 12, 12, 11, 1, '2023-09-01', 0, 0),
(10, 1, 12, 12, 11, 1, '2023-09-01', 1, 0),
(11, 1, 12, 12, 11, 1, '2023-09-01', 1, 0),
(12, 1, 12, 12, 11, 1, '2023-09-01', 1, 0),
(13, 1, 12, 12, 11, 1, '2023-09-01', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fecha_enarm`
--

CREATE TABLE `fecha_enarm` (
  `id` int(11) NOT NULL,
  `fecha_anio` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `fecha_enarm`
--

INSERT INTO `fecha_enarm` (`id`, `fecha_anio`) VALUES
(1, 2023),
(2, 2024),
(3, 2025);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frases`
--

CREATE TABLE `frases` (
  `id` int(11) NOT NULL,
  `frase` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `frases`
--

INSERT INTO `frases` (`id`, `frase`, `autor`) VALUES
(1, 'Cuéntamelo y me olvidaré. enséñamelo y lo recordaré. involúcrame y lo aprenderé.', 'Benjamin Franklin'),
(2, 'La motivación es lo que te pone en marcha, el hábito es lo que hace que sigas.', 'Jim Ryun'),
(3, 'El hombre que es un maestro de la paciencia es un maestro de todo lo demás.', 'George Saville'),
(4, 'Tus talentos y habilidades irán mejorando con el tiempo, pero para eso has de empezar.', 'Martin Luther King'),
(5, 'Aprender sin pensar es inútil. Pensar sin aprender, peligroso.', 'Confucio'),
(6, 'Es posible recuperarse de una derrota, pero cuesta más perdonarse a uno mismo por no haberlo intentado.', 'George Edward Woodberry');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboratory_category`
--

CREATE TABLE `laboratory_category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `laboratory_category`
--

INSERT INTO `laboratory_category` (`id`, `name`) VALUES
(22, 'nueva'),
(24, 'pruebas'),
(26, 'prueba 1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboratory_values`
--

CREATE TABLE `laboratory_values` (
  `id` int(11) NOT NULL,
  `fk_category` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `ejemplo` varchar(100) NOT NULL,
  `valor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `laboratory_values`
--

INSERT INTO `laboratory_values` (`id`, `fk_category`, `name`, `ejemplo`, `valor`) VALUES
(17, 22, 'prueba', '40 -20', '30'),
(18, 22, 'prueba 2', '0 a 2 mg', '.1mg'),
(19, 24, 'prueba 1', 'de 20 a 55', '55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`id`, `nombre`) VALUES
(1, 'México');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `id` int(11) NOT NULL,
  `idCasoclinico` int(11) NOT NULL,
  `orden` int(11) NOT NULL,
  `pregunta` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `subrayadoInicio` int(5) NOT NULL,
  `subrayadoFin` int(5) NOT NULL,
  `resumen` varchar(2048) NOT NULL,
  `bibliografia` varchar(1024) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`id`, `idCasoclinico`, `orden`, `pregunta`, `imagen`, `subrayadoInicio`, `subrayadoFin`, `resumen`, `bibliografia`, `active`) VALUES
(1, 1, 0, '1 prueba', 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 5, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', '[\'Lorem ipsum dolor sit amet, consectetur adipiscing.\', \'Lorem ipsum dolor sit amet, consectetur adipiscing.\']', 1),
(2, 1, 0, '2', 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 5, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', '[\'Lorem ipsum dolor sit amet, consectetur adipiscing.\', \'Lorem ipsum dolor sit amet, consectetur adipiscing.\']', 0),
(3, 1, 0, '3', 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 5, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', '[\'Lorem ipsum dolor sit amet, consectetur adipiscing.\', \'Lorem ipsum dolor sit amet, consectetur adipiscing.\']', 1),
(4, 1, 0, '¿Cuál de los siguientes es el factor predisponente más probable para la condición de este paciente?', 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 5, 5, 'Una dieta hipercalórica y el sedentarismo son factores de riesgo de obesidad ( IMC > 30 kg/m2), lo que aumenta el riesgo de DM2 al intensificar la resistencia periférica a la insulina .', '[\'https://www.imss.gob.mx/sites/all/statics/guiasclinicas/718GER.pdf\' ,\'\nhttps://diabetesjournals.org/care/article/46/Supplement_1/S41/148039/3-Prevention-or-Delay-of-Type-2-Diabetes-and\']', 1),
(5, 1, 0, '5', 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 5, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', '[\'Lorem ipsum dolor sit amet, consectetur adipiscing.\', \'Lorem ipsum dolor sit amet, consectetur adipiscing.\']', 1),
(6, 1, 0, '6', 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 5, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', '[\'Lorem ipsum dolor sit amet, consectetur adipiscing.\', \'Lorem ipsum dolor sit amet, consectetur adipiscing.\']', 1),
(7, 1, 1, 'fdsadfasd', 'asdasdas', 5, 20, 'uytdfghfgdsfsdf', 'dfgdfgdfgdfgdfg', 1),
(13, 14, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 5, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', '[\'Lorem ipsum dolor sit amet, consectetur adipiscing.\', \'Lorem ipsum dolor sit amet, consectetur adipiscing.\']', 1),
(14, 15, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 5, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', '[\'Lorem ipsum dolor sit amet, consectetur adipiscing.\', \'Lorem ipsum dolor sit amet, consectetur adipiscing.\']', 1),
(15, 16, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 5, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', '[\'Lorem ipsum dolor sit amet, consectetur adipiscing.\', \'Lorem ipsum dolor sit amet, consectetur adipiscing.\']', 1),
(16, 17, 0, 'asdasdas', '', 0, 0, 'PGJsb2NrcXVvdGU+c2Rmc2RmPC9ibG9ja3F1b3RlPg==', 'PHA+PHN0cm9uZz5zZGZzZGY8L3N0cm9uZz48L3A+', 1),
(17, 18, 0, 'qweqwe', '', 0, 0, 'PHA+cXdlcXdlPC9wPg==', 'PHA+cXdlcXdlPC9wPg==', 1),
(18, 19, 0, 'qweqwe', '', 0, 0, 'PHA+cXdlcXdlPC9wPg==', 'PHA+cXdlcXdlPC9wPg==', 1),
(19, 32, 0, 'werdfgsdf', 'https://enrm-dev-images.s3.amazonaws.com/undefined_1695687475842', 0, 0, 'PHA+c2Rmc2Rmc2RmPC9wPg==', 'PHA+c2Rmc2Rmc2Q8L3A+', 1),
(20, 33, 0, 'werdfgsdf', 'https://enrm-dev-images.s3.amazonaws.com/undefined_1695687618641.jpeg', 0, 0, 'PHA+c2Rmc2Rmc2RmPC9wPg==', 'PHA+c2Rmc2Rmc2Q8L3A+', 1),
(21, 34, 0, 'werdfgsdf', 'https://enrm-dev-images.s3.amazonaws.com/werdfgsdf_1695687729464.jpeg', 0, 0, 'PHA+c2Rmc2Rmc2RmPC9wPg==', 'PHA+c2Rmc2Rmc2Q8L3A+', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas_examen`
--

CREATE TABLE `preguntas_examen` (
  `id` int(11) NOT NULL,
  `idExamen` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `idRespuesta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `preguntas_examen`
--

INSERT INTO `preguntas_examen` (`id`, `idExamen`, `idPregunta`, `idRespuesta`) VALUES
(3, 3, 5, 1),
(4, 3, 6, NULL),
(6, 4, 4, 16),
(7, 4, 5, 5),
(8, 4, 6, 7),
(9, 5, 2, NULL),
(10, 5, 3, NULL),
(11, 5, 1, NULL),
(12, 4, 13, 10),
(13, 7, 14, NULL),
(14, 7, 5, 5),
(15, 7, 2, 2),
(16, 7, 13, NULL),
(17, 7, 3, 9),
(18, 7, 1, 1),
(19, 7, 4, 15),
(20, 7, 15, NULL),
(21, 7, 7, NULL),
(22, 7, 16, NULL),
(23, 7, 6, NULL),
(24, 8, 7, NULL),
(25, 8, 15, NULL),
(26, 8, 2, NULL),
(27, 8, 1, NULL),
(28, 8, 4, NULL),
(29, 8, 16, NULL),
(30, 8, 5, NULL),
(31, 8, 6, NULL),
(32, 8, 13, NULL),
(33, 8, 3, NULL),
(34, 8, 14, NULL),
(35, 9, 14, NULL),
(36, 9, 16, NULL),
(37, 9, 15, NULL),
(38, 9, 4, NULL),
(39, 9, 3, NULL),
(40, 9, 2, NULL),
(41, 9, 5, NULL),
(42, 9, 1, NULL),
(43, 9, 6, NULL),
(44, 9, 7, NULL),
(45, 9, 13, NULL),
(46, 10, 3, NULL),
(47, 10, 6, NULL),
(48, 10, 2, NULL),
(49, 10, 5, NULL),
(50, 10, 1, NULL),
(51, 10, 16, NULL),
(52, 10, 4, NULL),
(53, 10, 14, NULL),
(54, 10, 7, NULL),
(55, 10, 13, NULL),
(56, 10, 15, NULL),
(57, 11, 6, NULL),
(58, 11, 4, NULL),
(59, 11, 14, NULL),
(60, 11, 15, NULL),
(61, 11, 3, NULL),
(62, 11, 1, NULL),
(63, 11, 2, NULL),
(64, 11, 7, NULL),
(65, 11, 5, NULL),
(66, 11, 16, NULL),
(67, 11, 13, NULL),
(68, 12, 5, NULL),
(69, 12, 16, NULL),
(70, 12, 14, NULL),
(71, 12, 13, NULL),
(72, 12, 1, NULL),
(73, 12, 2, NULL),
(74, 12, 4, NULL),
(75, 12, 15, NULL),
(76, 12, 7, NULL),
(77, 12, 3, NULL),
(78, 12, 6, NULL),
(79, 13, 6, 6),
(80, 13, 15, NULL),
(81, 13, 7, NULL),
(82, 13, 4, NULL),
(83, 13, 14, NULL),
(84, 13, 1, NULL),
(85, 13, 3, NULL),
(86, 13, 5, NULL),
(87, 13, 13, NULL),
(88, 13, 2, NULL),
(89, 13, 16, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntajes`
--

CREATE TABLE `puntajes` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `puntaje` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

CREATE TABLE `respuesta` (
  `id` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `respuesta` varchar(255) NOT NULL,
  `isCorrecta` tinyint(1) NOT NULL,
  `retroalimentacion` varchar(2048) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `respuesta`
--

INSERT INTO `respuesta` (`id`, `idPregunta`, `respuesta`, `isCorrecta`, `retroalimentacion`, `imagen`) VALUES
(1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', ''),
(2, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', ''),
(3, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', ''),
(4, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', ''),
(5, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', ''),
(6, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', ''),
(7, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', ''),
(8, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', ''),
(9, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', ''),
(10, 13, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', ''),
(11, 14, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', ''),
(12, 15, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing.', ''),
(13, 16, 'sdfsdfsdf', 0, 'PG9sPjxsaT5xd2Vxd2VxPC9saT48L29sPg==', ''),
(14, 16, 'qweqweqwe', 1, 'PHA+YXNkYXNkYXNkYXNkYTwvcD4=', ''),
(15, 4, 'Dieta alta en calorias', 0, 'Una dieta hipercalórica y el sedentarismo son factores de riesgo de obesidad ( IMC > 30 kg/m2), lo que aumenta el riesgo de DM2 al intensificar la resistencia periférica a la insulina . La resistencia a la insulina inhibe la absorción de glucosa del torrente sanguíneo y altera el metabolismo anabólico . Las modificaciones en el estilo de vida, como la reducción de peso, una dieta balanceada y el ejercicio regular, reducen el riesgo de desarrollar DM2 .', ''),
(16, 4, 'Historial de tabaquismo', 0, 'Fumar es el principal factor de riesgo para el desarrollo de cáncer de pulmón y de páncreas y aumenta el riesgo de diversas afecciones. Si bien teóricamente podría haber un vínculo entre el tabaquismo y la DM2 (p. ej., alteración de la sensibilidad a la insulina y aumento de la concentración de glucosa en sangre en los fumadores), no existe evidencia definitiva de una asociación causal.', ''),
(17, 4, 'Estado HLA-DR4', 0, 'HLA-DR4 está fuertemente asociado con numerosas enfermedades autoinmunes, incluida la diabetes mellitus tipo I ( T1DM ). Sin embargo, este paciente tiene DM2 , que es causada por una combinación de factores hereditarios y ambientales y está fuertemente asociada con el síndrome metabólico . T2DM no es una condición autoinmune y no está asociada con HLA-DR4 .', ''),
(18, 4, 'Consumo de alcohol', 1, 'El consumo excesivo de alcohol es un factor de riesgo para el desarrollo de pancreatitis aguda y crónica , hepatopatía alcohólica y neoplasias malignas como el carcinoma de células escamosas del esófago . Sin embargo, el consumo de alcohol no está asociado con un mayor riesgo de DM2 .', ''),
(19, 17, 'qweqweqe', 0, 'PHA+cXdlcWFzZHF3ZGFzZDwvcD4=', ''),
(20, 17, 'addsfsd', 1, 'PHA+Zmhna2pnaGpnaGo8L3A+', ''),
(21, 18, 'qweqweqe', 0, 'PHA+cXdlcWFzZHF3ZGFzZDwvcD4=', ''),
(22, 18, 'addsfsd', 1, 'PHA+Zmhna2pnaGpnaGo8L3A+', ''),
(23, 19, 'sdfsdfsd', 1, 'PHA+ZGZzZGZzZGZzPC9wPg==', ''),
(24, 19, 'rrewwerwer', 0, 'PHA+d2Vyd2Vyd2VyPC9wPg==', ''),
(25, 20, 'sdfsdfsd', 1, 'PHA+ZGZzZGZzZGZzPC9wPg==', ''),
(26, 20, 'rrewwerwer', 0, 'PHA+d2Vyd2Vyd2VyPC9wPg==', ''),
(27, 21, 'sdfsdfsd', 1, 'PHA+ZGZzZGZzZGZzPC9wPg==', ''),
(28, 21, 'rrewwerwer', 0, 'PHA+d2Vyd2Vyd2VyPC9wPg==', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategoria`
--

CREATE TABLE `subcategoria` (
  `id` int(11) NOT NULL,
  `fkid_categoria` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `subcategoria`
--

INSERT INTO `subcategoria` (`id`, `fkid_categoria`, `Nombre`) VALUES
(4, 11, 'Cardiología'),
(5, 11, 'Dermatología'),
(6, 12, 'Anestesiología'),
(7, 12, 'Cirugía General'),
(8, 12, 'Oftalmología'),
(9, 13, 'Neonatología'),
(10, 14, 'SubMedi Familiar 1'),
(11, 14, 'SubMedi Familiar2'),
(12, 15, 'Ginecología'),
(13, 15, 'Salud Pública'),
(14, 19, 'Prueba01'),
(17, 19, 'test2'),
(18, 19, 'test3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripcion`
--

CREATE TABLE `suscripcion` (
  `id` int(11) NOT NULL,
  `tipo` varchar(35) NOT NULL,
  `costo` float NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `duracionMes` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `suscripcion`
--

INSERT INTO `suscripcion` (`id`, `tipo`, `costo`, `descripcion`, `duracionMes`) VALUES
(1, 'Estandar', 120, 'plan mensual', 1),
(2, 'undefined', 0, 'undefined', 0),
(3, 'estandar', 1000, 'Plan 12 meses', 12),
(4, 'estandar', 2000, 'Anualidad', 12),
(5, 'undefined', 0, 'undefined', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_examen`
--

CREATE TABLE `tipo_examen` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_examen`
--

INSERT INTO `tipo_examen` (`id`, `tipo`) VALUES
(1, 'tipo 1'),
(2, 'tipo 2'),
(3, 'tipo 1'),
(4, 'tipo 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id` int(11) NOT NULL,
  `tipo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id`, `tipo`) VALUES
(1, 'Estudiante'),
(2, 'Médico Interno de Pregrado'),
(3, 'Médico Pasante de Servicio Social'),
(4, 'Médico General'),
(5, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `universidades`
--

CREATE TABLE `universidades` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `idPais` int(11) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `isPublica` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `universidades`
--

INSERT INTO `universidades` (`id`, `nombre`, `idPais`, `estado`, `isPublica`) VALUES
(1, 'BENEMÉRITA UNIVERSIDAD AUTÓNOMA DE PUEBLA', 1, 'Puebla', 1),
(2, 'CAMPUS UNIVERSITARIO SIGLO XXI, S.C. (ESTADO DE MÉXICO)', 1, 'Estado de México', 1),
(3, 'CENTRO DE ESTUDIOS SUPERIORES DE TEPEACA, A.C.', 1, 'Puebla', 1),
(4, 'CENTRO DE ESTUDIOS UNIVERSITARIOS XOCHICALCO', 1, 'Morelos', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `idSuscripcion` int(11) DEFAULT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(25) DEFAULT NULL,
  `ruta_fotografia` varchar(100) NOT NULL,
  `idTipoUsuario` int(11) NOT NULL,
  `idUniversidad` int(11) NOT NULL,
  `idFechaEnarm` int(11) NOT NULL,
  `idEspecialidad` int(11) NOT NULL,
  `cumpleanos` varchar(50) NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `id_social_media` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `idSuscripcion`, `nombres`, `apellidos`, `email`, `password`, `ruta_fotografia`, `idTipoUsuario`, `idUniversidad`, `idFechaEnarm`, `idEspecialidad`, `cumpleanos`, `sexo`, `id_social_media`) VALUES
(1, 1, 'Delsy Patricia', 'Felix Ortiz', 'elpistolas99@gmail.com', '0.m8yibqdtjo', 'c:/hola/hola.jpg', 5, 1, 1, 3, '26', 'Hombre', NULL),
(2, 1, 'Manuel', ' de la O', 'elpistolas2@gmail.com', '.x553jmcsohj', 'c:/hola/hola.jpg', 1, 2, 1, 3, '28', 'Hombre', NULL),
(3, 1, 'Manuel', ' de la O', 'elpistolas3@gmail.com', 'u0nlcnpg', 'c:/hola/hola.jpg', 4, 2, 1, 3, '28', 'Hombre', NULL),
(4, 1, 'Manuel', ' de la O', 'elpistolas4@gmail.com', '257uk522', 'c:/hola/hola.jpg', 4, 2, 1, 3, '28', 'Hombre', NULL),
(5, 1, 'Manuel', ' de la O', 'elpisto@gmail.com', '$2b$12$Cz0oajLIzM29byvPgy', 'c:/hola/hola.jpg', 4, 2, 1, 3, '28', 'Hombre', NULL),
(6, 1, 'Manuel', ' de la O', 'elpistas@gmail.com', '$2b$12$P6OrDlh0aZcQCvdmM8', 'c:/hola/hola.jpg', 4, 2, 1, 3, '28', 'Hombre', NULL),
(8, 1, 'Alejandroi', 'Marrufo', 'elpistolas@gmail.comm', 'qwertyui', '', 1, 1, 1, 2, '21', 'Masculino', NULL),
(11, 2, 'Uri Josafat', 'Alcantar Avila', 'elpistolas@gmail.commm', 'qwertyui', '', 3, 2, 3, 2, '25', 'Masculino', NULL),
(12, 1, 'Jose Manuel', 'Garcia Barron', 'josemanuelgarciadelao@gmail.com', 'z5xmwzcc', '', 5, 1, 2, 2, '17', 'Masculino', '10225881086365118'),
(16, 1, 'Alejandro', 'Carrillo Sifuentes', 'carrillo@gmial.coma', 'v5rchcpa', '', 2, 1, 1, 1, '17', 'Masculino', NULL),
(20, NULL, 'Jose Manuel', 'Centr Centr', 'Centr@yopmail.com', 'qwerty123', '', 2, 2, 1, 3, '2023-03-21', 'Masculino', 'null'),
(21, 1, 'Ramiro Joel', 'Gonzalez Saavedra', 'rjoelgs@hotmail.com', 'qwertyui123', '', 5, 1, 1, 1, '27', 'Masculino', 'null'),
(22, NULL, 'El Capo', 'Mas  Capo', 'manuel@manuel.com', 'manuelpass', '', 1, 1, 1, 4, '2008-01-29', 'Masculino', 'null');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `account_estatus`
--
ALTER TABLE `account_estatus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`idUsuario`);

--
-- Indices de la tabla `caso_clinico`
--
ALTER TABLE `caso_clinico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idSubcategoria` (`idSubcategoria`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `configs`
--
ALTER TABLE `configs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `examen`
--
ALTER TABLE `examen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idtipo` (`idTipo`),
  ADD KEY `idusuario` (`idUsuario`);

--
-- Indices de la tabla `fecha_enarm`
--
ALTER TABLE `fecha_enarm`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `frases`
--
ALTER TABLE `frases`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `laboratory_category`
--
ALTER TABLE `laboratory_category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `laboratory_values`
--
ALTER TABLE `laboratory_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_category` (`fk_category`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCasoclinico` (`idCasoclinico`);

--
-- Indices de la tabla `preguntas_examen`
--
ALTER TABLE `preguntas_examen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idExamen` (`idExamen`),
  ADD KEY `idRespuesta` (`idRespuesta`),
  ADD KEY `idPregunta` (`idPregunta`);

--
-- Indices de la tabla `puntajes`
--
ALTER TABLE `puntajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idusuario` (`idUsuario`);

--
-- Indices de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idpregunta` (`idPregunta`);

--
-- Indices de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkid_categoria` (`fkid_categoria`);

--
-- Indices de la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_examen`
--
ALTER TABLE `tipo_examen`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `universidades`
--
ALTER TABLE `universidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPais` (`idPais`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idsuscripcion` (`idSuscripcion`),
  ADD KEY `idTipoUsuario` (`idTipoUsuario`),
  ADD KEY `idUniversidad` (`idUniversidad`),
  ADD KEY `idFechaEnarm` (`idFechaEnarm`),
  ADD KEY `idEspecialidad` (`idEspecialidad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `account_estatus`
--
ALTER TABLE `account_estatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `caso_clinico`
--
ALTER TABLE `caso_clinico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `configs`
--
ALTER TABLE `configs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `examen`
--
ALTER TABLE `examen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `frases`
--
ALTER TABLE `frases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `laboratory_category`
--
ALTER TABLE `laboratory_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `laboratory_values`
--
ALTER TABLE `laboratory_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `preguntas_examen`
--
ALTER TABLE `preguntas_examen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT de la tabla `puntajes`
--
ALTER TABLE `puntajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_examen`
--
ALTER TABLE `tipo_examen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `account_estatus`
--
ALTER TABLE `account_estatus`
  ADD CONSTRAINT `account_estatus_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `caso_clinico`
--
ALTER TABLE `caso_clinico`
  ADD CONSTRAINT `caso_clinico_ibfk_1` FOREIGN KEY (`idSubcategoria`) REFERENCES `subcategoria` (`id`);

--
-- Filtros para la tabla `examen`
--
ALTER TABLE `examen`
  ADD CONSTRAINT `examen_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tipo_examen` (`id`),
  ADD CONSTRAINT `examen_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `laboratory_values`
--
ALTER TABLE `laboratory_values`
  ADD CONSTRAINT `laboratory_values_ibfk_1` FOREIGN KEY (`fk_category`) REFERENCES `laboratory_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`idCasoclinico`) REFERENCES `caso_clinico` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `preguntas_examen`
--
ALTER TABLE `preguntas_examen`
  ADD CONSTRAINT `preguntas_examen_ibfk_1` FOREIGN KEY (`idExamen`) REFERENCES `examen` (`id`),
  ADD CONSTRAINT `preguntas_examen_ibfk_2` FOREIGN KEY (`idRespuesta`) REFERENCES `respuesta` (`id`),
  ADD CONSTRAINT `preguntas_examen_ibfk_3` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`);

--
-- Filtros para la tabla `puntajes`
--
ALTER TABLE `puntajes`
  ADD CONSTRAINT `puntajes_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD CONSTRAINT `respuesta_ibfk_2` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`);

--
-- Filtros para la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD CONSTRAINT `subcategoria_ibfk_1` FOREIGN KEY (`fkid_categoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `universidades`
--
ALTER TABLE `universidades`
  ADD CONSTRAINT `universidades_ibfk_1` FOREIGN KEY (`idPais`) REFERENCES `paises` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idSuscripcion`) REFERENCES `suscripcion` (`id`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`idTipoUsuario`) REFERENCES `tipo_usuario` (`id`),
  ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`idUniversidad`) REFERENCES `universidades` (`id`),
  ADD CONSTRAINT `usuario_ibfk_4` FOREIGN KEY (`idFechaEnarm`) REFERENCES `fecha_enarm` (`id`),
  ADD CONSTRAINT `usuario_ibfk_5` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidades` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
