-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2025 a las 16:25:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sake&roll`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canjeos`
--

CREATE TABLE `canjeos` (
  `IdCanje` int(3) NOT NULL,
  `IdUsuario` int(3) NOT NULL,
  `IdOferta` int(11) NOT NULL,
  `IdPlato` int(3) NOT NULL,
  `fecha_canjeo` varchar(10) NOT NULL,
  `Descuento` varchar(5) NOT NULL,
  `Estado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carta`
--

CREATE TABLE `carta` (
  `Idplato` int(3) NOT NULL,
  `Precio` float DEFAULT NULL,
  `Plato` text NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `Stock` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carta`
--

INSERT INTO `carta` (`Idplato`, `Precio`, `Plato`, `descripcion`, `tipo`, `Stock`) VALUES
(12, 5.5, 'Umami Edamame Explosion', 'Edamame salteado con miso rojo, aceite de sésamo y escamas de sal negra.\nIngredientes: Edamame, miso rojo, aceite de sésamo, sal negra, ajo en polvo.', 'Entrante', 50),
(13, 9.5, 'Sake&Roll Gyoza Fusion', 'Gyozas rellenas de langostinos y trufa, servidas con reducción de soja y cítricos.\nIngredientes: Masa de gyoza, langostinos, trufa negra, cebollino, salsa de soja, yuzu.', 'Entrante', 50),
(14, 14, 'Tartar de Atún Flameado', 'Dados de atún rojo ligeramente flameados con emulsión de aguacate y wasabi fresco.\nIngredientes: Atún rojo, aguacate, wasabi, salsa ponzu, cebolla morada, tobiko.', 'Entrante', 50),
(15, 13, 'Tempura de Soft Shell Crab', 'Cangrejo de caparazón blando en tempura crujiente con aliño de yuzukosho y miel.\nIngredientes: Cangrejo blando, harina tempura, yuzu, miel, ajo negro, mayonesa japonesa.', 'Entrante', 50),
(16, 12, 'Ramen Umami Supreme', 'Caldoso ramen de doble cocción con panceta chashu, huevo onsen y alga nori crocante.\nIngredientes: Fideos ramen, caldo de hueso de cerdo y miso, chashu, huevo a baja temperatura, alga nori, cebolleta.', 'Plato principal', 50),
(17, 16.5, 'Black Truffle Wagyu Nigiri', 'Nigiris de Wagyu A5 con un toque de trufa negra y escamas de sal maldon.\nIngredientes: Arroz sushi, Wagyu A5, trufa negra, salsa de soja, sal Maldon.', 'Plato principal', 50),
(18, 12, 'Sushi Omakase Experience', 'Selección premium de sushi elaborada con el pescado más fresco del día.\nIngredientes: Variedad de nigiris y makis según disponibilidad de mercado.', 'Plato principal', 50),
(19, 16, 'Pulpo Robata con Miso Caramelizado', 'Pulpo asado en parrilla robata con glaseado de miso dulce y ají amarillo.\nIngredientes: Pulpo, miso rojo, mirin, sake, ají amarillo, ajo negro.', 'Plato principal', 50),
(20, 7, 'Matcha Highball', 'Whisky japonés, soda de matcha y un toque de lima fresca.\nIngredientes: Whisky japonés, matcha, soda, sirope de agave, lima.', 'Coctel', 50),
(21, 7.5, 'Sake Passion Spritz', 'Sake espumoso con maracuyá y un toque de yuzushu.\nIngredientes: Sake espumoso, maracuyá, Sake espumoso con maracuyá y un toque de yuzushu.\nIngredientes: Sake espumoso, maracuyá, yuzushu, bitter de naranja.', 'Coctel', 50),
(22, 0, '20% Descuento', 'OFERTA', 'descuento', 510),
(23, 0, 'Sushi Roll', 'OFERTA', 'Entrante', 50),
(24, 7, 'Shiso Mule', 'Twist del clásico Moscow Mule con jengibre, shiso y vodka premium.\nIngredientes: Vodka, jengibre fresco, soda de lima, shiso, angostura.', 'Coctel', 50),
(25, 5.5, 'Mocktail Sakura Bloom (Sin alcohol)', 'Infusión floral de cerezo japonés con limón y espuma de lichis.\nIngredientes: Té de flor de cerezo, limón, sirope de lichis, espuma de coco.', 'Coctel', 50),
(26, 12, 'Cheesecake de Yuzu con Crumble de Sésamo', 'Tarta cremosa con un punto cítrico y crocante de sésamo negro.\nIngredientes: Queso crema, yuzu, azúcar de caña, galleta de sésamo.', 'Postre', 50),
(27, 9, 'Mochis Artesanales Sake&Roll', 'Selección de mochis rellenos de matcha, sésamo y frambuesa-limón.\nIngredientes: Harina de arroz, azúcar, matcha, sésamo, frambuesa, limón.', 'Postre', 50),
(28, 8.5, 'Helado de Hōjicha con Caramelo de Miso', 'Helado de té hōjicha con salsa de caramelo salado al miso blanco.\nIngredientes: Leche, nata, azúcar, té hōjicha, miso blanco, mantequilla.', 'Postre', 50),
(29, 10, 'Taiyaki Crunch de Chocolate Blanco y Té Verde', 'Pez de masa crujiente relleno de crema de matcha y chocolate blanco.\nIngredientes: Harina, huevo, leche, matcha, chocolate blanco, azúcar.', 'Postre', 50),
(30, 19.99, 'Carpaccio de Hamachi con Perlas de Yuzu', 'Finas láminas de hamachi (pez limón) marinadas en ponzu y decoradas con perlas de yuzu y aceite de cebollino. Un equilibrio perfecto entre frescura y acidez.\r\nIngredientes: Hamachi, salsa ponzu, perlas de yuzu, aceite de cebollino, flor de sal.', 'Entrante', 50),
(31, 20, 'Kakuni de Wagyu con Puré de Daikon', 'Panceta de Wagyu cocida a fuego lento durante 12 horas en un glaseado de soja, sake y azúcar de Okinawa, servida con puré de rábano japonés y chips de ajo negro.\r\nIngredientes: Wagyu, salsa de soja, sake, azúcar de Okinawa, daikon, ajo negro', 'Plato principal', 50),
(33, 0, 'Refresco', 'OFERTA', 'Coctel', 250),
(123, 0, 'Mochi Japonés', 'OFERTA', 'Postre', 50),
(343, 0, 'Combo especial', 'OFERTA', 'Plato principal', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallepedido`
--

CREATE TABLE `detallepedido` (
  `Iddetalle` int(11) NOT NULL,
  `IdPedido` int(11) NOT NULL,
  `TipoEntrega` text NOT NULL,
  `idplato` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detallepedido`
--

INSERT INTO `detallepedido` (`Iddetalle`, `IdPedido`, `TipoEntrega`, `idplato`, `cantidad`) VALUES
(228, 112, 'domicilio', 15, 2),
(229, 112, 'domicilio', 12, 2),
(230, 113, 'recoger', 12, 1),
(231, 113, 'recoger', 13, 1),
(232, 114, 'recoger', 12, 1),
(233, 114, 'recoger', 13, 1),
(234, 114, 'recoger', 14, 1),
(235, 115, 'recoger', 12, 1),
(236, 115, 'recoger', 13, 1),
(237, 116, 'recoger', 12, 2),
(238, 116, 'recoger', 13, 1),
(239, 117, 'recoger', 12, 1),
(240, 118, 'recoger', 12, 4),
(241, 119, 'recoger', 12, 1),
(242, 120, 'recoger', 12, 1),
(243, 121, 'recoger', 12, 1),
(244, 121, 'recoger', 13, 1),
(245, 122, 'recoger', 12, 2),
(246, 123, 'recoger', 12, 4),
(247, 124, 'recoger', 12, 5),
(248, 125, 'recoger', 12, 1),
(249, 125, 'recoger', 13, 1),
(250, 126, 'recoger', 12, 4),
(251, 127, 'recoger', 13, 7),
(252, 128, 'recoger', 12, 3),
(253, 129, 'recoger', 13, 5),
(254, 130, 'recoger', 12, 4),
(255, 131, 'recoger', 12, 4),
(256, 132, 'recoger', 12, 3),
(257, 133, 'recoger', 12, 3),
(258, 134, 'recoger', 12, 4),
(259, 135, 'recoger', 12, 4),
(260, 136, 'domicilio', 12, 2),
(261, 137, 'recoger', 12, 4),
(262, 138, 'recoger', 12, 3),
(263, 139, 'recoger', 12, 3),
(264, 140, 'recoger', 13, 4),
(265, 141, 'recoger', 12, 4),
(266, 142, 'recoger', 12, 4),
(267, 143, 'recoger', 12, 4),
(268, 144, 'recoger', 12, 1),
(269, 145, 'Recoger', 12, 3),
(270, 146, 'Domicilio', 12, 2),
(271, 147, 'Domicilio', 30, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logins`
--

CREATE TABLE `logins` (
  `idlogin` int(4) NOT NULL,
  `idusuario` int(4) NOT NULL,
  `fecha` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `logins`
--

INSERT INTO `logins` (`idlogin`, `idusuario`, `fecha`) VALUES
(470, 18, '12/5/2025'),
(471, 18, '12/5/2025'),
(472, 18, '12/5/2025'),
(473, 18, '12/5/2025'),
(474, 18, '12/5/2025'),
(475, 18, '12/5/2025'),
(476, 18, '12/5/2025'),
(477, 18, '12/5/2025'),
(478, 18, '13/5/2025'),
(479, 18, '13/5/2025'),
(480, 18, '13/5/2025'),
(481, 18, '13/5/2025'),
(482, 18, '14/5/2025'),
(483, 18, '14/5/2025'),
(484, 18, '14/5/2025'),
(485, 18, '14/5/2025'),
(486, 18, '14/5/2025'),
(487, 18, '14/5/2025'),
(488, 18, '14/5/2025'),
(489, 18, '14/5/2025'),
(490, 18, '14/5/2025'),
(491, 18, '14/5/2025'),
(492, 18, '14/5/2025'),
(493, 18, '14/5/2025'),
(494, 18, '14/5/2025'),
(495, 18, '14/5/2025'),
(496, 18, '14/5/2025'),
(497, 18, '14/5/2025'),
(498, 18, '14/5/2025'),
(499, 18, '14/5/2025'),
(500, 18, '14/5/2025'),
(501, 18, '14/5/2025'),
(502, 18, '14/5/2025'),
(503, 18, '14/5/2025'),
(504, 18, '14/5/2025'),
(505, 18, '14/5/2025'),
(506, 18, '14/5/2025'),
(507, 18, '14/5/2025'),
(508, 18, '14/5/2025'),
(509, 18, '14/5/2025'),
(510, 18, '14/5/2025'),
(511, 18, '14/5/2025'),
(512, 18, '14/5/2025'),
(513, 18, '14/5/2025'),
(514, 18, '14/5/2025'),
(515, 18, '14/5/2025'),
(516, 18, '14/5/2025'),
(517, 18, '14/5/2025'),
(518, 18, '14/5/2025'),
(519, 18, '14/5/2025'),
(520, 18, '14/5/2025'),
(521, 18, '14/5/2025'),
(522, 18, '14/5/2025'),
(523, 18, '14/5/2025'),
(524, 18, '14/5/2025'),
(525, 18, '14/5/2025'),
(526, 18, '14/5/2025'),
(527, 18, '14/5/2025'),
(528, 18, '14/5/2025'),
(529, 18, '14/5/2025'),
(530, 18, '14/5/2025'),
(531, 18, '14/5/2025'),
(532, 18, '14/5/2025'),
(533, 18, '14/5/2025'),
(534, 18, '14/5/2025'),
(535, 18, '14/5/2025'),
(536, 18, '14/5/2025'),
(537, 18, '14/5/2025'),
(538, 18, '14/5/2025'),
(539, 18, '14/5/2025'),
(540, 18, '14/5/2025'),
(541, 18, '14/5/2025'),
(542, 18, '14/5/2025'),
(543, 18, '14/5/2025'),
(544, 18, '14/5/2025'),
(545, 18, '14/5/2025'),
(546, 18, '14/5/2025'),
(547, 18, '14/5/2025'),
(548, 18, '14/5/2025'),
(549, 18, '14/5/2025'),
(550, 18, '14/5/2025'),
(551, 18, '14/5/2025'),
(552, 18, '14/5/2025'),
(553, 18, '14/5/2025'),
(554, 18, '14/5/2025'),
(555, 18, '14/5/2025'),
(556, 18, '14/5/2025'),
(557, 18, '14/5/2025'),
(558, 18, '14/5/2025'),
(559, 18, '14/5/2025'),
(560, 18, '14/5/2025'),
(561, 18, '14/5/2025'),
(562, 18, '15/5/2025'),
(563, 18, '15/5/2025'),
(564, 18, '15/5/2025'),
(565, 18, '15/5/2025'),
(566, 18, '15/5/2025'),
(567, 18, '15/5/2025'),
(568, 18, '15/5/2025'),
(569, 18, '15/5/2025'),
(570, 18, '15/5/2025'),
(571, 18, '15/5/2025'),
(572, 18, '15/5/2025'),
(573, 18, '15/5/2025'),
(574, 18, '15/5/2025'),
(575, 18, '15/5/2025'),
(576, 18, '15/5/2025'),
(577, 18, '15/5/2025'),
(578, 18, '15/5/2025'),
(579, 18, '15/5/2025'),
(580, 18, '15/5/2025'),
(581, 18, '15/5/2025'),
(582, 18, '15/5/2025'),
(583, 18, '15/5/2025'),
(584, 18, '15/5/2025'),
(585, 18, '15/5/2025'),
(586, 18, '15/5/2025'),
(587, 18, '15/5/2025'),
(588, 18, '15/5/2025'),
(589, 18, '15/5/2025'),
(590, 18, '15/5/2025'),
(591, 18, '15/5/2025'),
(592, 18, '15/5/2025'),
(593, 18, '15/5/2025'),
(594, 18, '15/5/2025'),
(595, 18, '15/5/2025'),
(596, 18, '15/5/2025'),
(597, 18, '15/5/2025'),
(598, 18, '15/5/2025'),
(599, 18, '15/5/2025'),
(600, 18, '15/5/2025'),
(601, 18, '15/5/2025'),
(602, 18, '15/5/2025'),
(603, 18, '15/5/2025'),
(604, 18, '15/5/2025'),
(605, 18, '15/5/2025'),
(606, 18, '15/5/2025'),
(607, 18, '15/5/2025'),
(608, 18, '15/5/2025'),
(609, 18, '15/5/2025'),
(610, 18, '15/5/2025'),
(611, 18, '15/5/2025'),
(612, 18, '15/5/2025'),
(613, 18, '15/5/2025'),
(614, 18, '15/5/2025'),
(615, 18, '15/5/2025'),
(616, 18, '15/5/2025'),
(617, 18, '15/5/2025'),
(618, 18, '15/5/2025'),
(619, 18, '15/5/2025'),
(620, 18, '15/5/2025'),
(621, 18, '15/5/2025'),
(622, 18, '15/5/2025'),
(623, 18, '15/5/2025'),
(624, 18, '15/5/2025'),
(625, 18, '15/5/2025'),
(626, 18, '15/5/2025'),
(627, 18, '15/5/2025'),
(628, 18, '15/5/2025'),
(629, 18, '15/5/2025'),
(630, 18, '16/5/2025'),
(631, 18, '16/5/2025'),
(632, 18, '16/5/2025'),
(633, 18, '16/5/2025'),
(634, 18, '16/5/2025'),
(635, 18, '16/5/2025'),
(636, 18, '16/5/2025'),
(637, 18, '16/5/2025'),
(638, 18, '16/5/2025'),
(639, 18, '16/5/2025'),
(640, 18, '16/5/2025'),
(641, 18, '16/5/2025'),
(642, 18, '16/5/2025'),
(643, 18, '16/5/2025'),
(644, 18, '16/5/2025'),
(645, 18, '16/5/2025'),
(646, 18, '16/5/2025'),
(647, 18, '16/5/2025'),
(648, 18, '16/5/2025'),
(649, 18, '16/5/2025'),
(650, 18, '16/5/2025'),
(651, 18, '16/5/2025'),
(652, 18, '16/5/2025'),
(653, 18, '16/5/2025'),
(654, 18, '16/5/2025'),
(655, 18, '16/5/2025'),
(656, 18, '16/5/2025'),
(657, 18, '16/5/2025'),
(658, 18, '16/5/2025'),
(659, 18, '16/5/2025'),
(660, 18, '16/5/2025'),
(661, 18, '16/5/2025'),
(662, 18, '16/5/2025'),
(663, 18, '16/5/2025'),
(664, 18, '16/5/2025'),
(665, 18, '16/5/2025'),
(666, 18, '16/5/2025'),
(667, 18, '16/5/2025'),
(668, 18, '16/5/2025'),
(669, 18, '16/5/2025'),
(670, 18, '16/5/2025'),
(671, 18, '16/5/2025'),
(672, 18, '16/5/2025'),
(673, 18, '16/5/2025'),
(674, 18, '16/5/2025'),
(675, 18, '16/5/2025'),
(676, 18, '16/5/2025'),
(677, 18, '16/5/2025'),
(678, 18, '16/5/2025'),
(679, 18, '16/5/2025'),
(680, 18, '16/5/2025'),
(681, 18, '16/5/2025'),
(682, 18, '16/5/2025'),
(683, 18, '16/5/2025'),
(684, 18, '16/5/2025'),
(685, 18, '16/5/2025'),
(686, 18, '16/5/2025'),
(687, 18, '16/5/2025'),
(688, 18, '16/5/2025'),
(689, 18, '16/5/2025'),
(690, 18, '16/5/2025'),
(691, 18, '19/5/2025'),
(692, 18, '19/5/2025'),
(693, 18, '19/5/2025'),
(694, 18, '19/5/2025'),
(695, 18, '19/5/2025'),
(696, 18, '19/5/2025'),
(697, 18, '19/5/2025'),
(698, 18, '19/5/2025'),
(699, 18, '19/5/2025'),
(700, 18, '19/5/2025'),
(701, 18, '19/5/2025'),
(702, 18, '19/5/2025'),
(703, 18, '19/5/2025'),
(704, 18, '19/5/2025'),
(705, 18, '19/5/2025'),
(706, 18, '19/5/2025'),
(707, 18, '19/5/2025'),
(708, 18, '19/5/2025'),
(709, 18, '19/5/2025'),
(710, 18, '19/5/2025'),
(711, 18, '19/5/2025'),
(712, 18, '19/5/2025'),
(713, 18, '20/5/2025'),
(714, 18, '20/5/2025'),
(715, 18, '20/5/2025'),
(716, 19, '20/5/2025'),
(717, 18, '20/5/2025'),
(718, 18, '20/5/2025'),
(719, 18, '20/5/2025'),
(720, 18, '20/5/2025'),
(721, 18, '20/5/2025'),
(722, 18, '20/5/2025'),
(723, 18, '20/5/2025'),
(724, 18, '20/5/2025'),
(725, 18, '20/5/2025'),
(726, 18, '20/5/2025'),
(727, 18, '20/5/2025'),
(728, 18, '20/5/2025'),
(729, 18, '20/5/2025'),
(730, 18, '20/5/2025'),
(731, 18, '20/5/2025'),
(732, 18, '20/5/2025'),
(733, 18, '20/5/2025'),
(734, 18, '20/5/2025'),
(735, 18, '20/5/2025'),
(736, 18, '20/5/2025'),
(737, 18, '20/5/2025'),
(738, 18, '20/5/2025'),
(739, 18, '20/5/2025'),
(740, 18, '20/5/2025'),
(741, 18, '20/5/2025'),
(742, 18, '20/5/2025'),
(743, 18, '20/5/2025'),
(744, 18, '20/5/2025'),
(745, 18, '20/5/2025'),
(746, 18, '20/5/2025'),
(747, 18, '20/5/2025'),
(748, 18, '20/5/2025'),
(749, 18, '20/5/2025'),
(750, 18, '20/5/2025'),
(751, 18, '20/5/2025'),
(752, 18, '20/5/2025'),
(753, 18, '20/5/2025'),
(754, 18, '20/5/2025'),
(755, 18, '20/5/2025'),
(756, 18, '20/5/2025'),
(757, 18, '20/5/2025'),
(758, 18, '20/5/2025'),
(759, 18, '20/5/2025'),
(760, 18, '20/5/2025'),
(761, 18, '20/5/2025'),
(762, 18, '20/5/2025'),
(763, 18, '20/5/2025'),
(764, 18, '20/5/2025'),
(765, 18, '20/5/2025'),
(766, 18, '20/5/2025'),
(767, 18, '20/5/2025'),
(768, 18, '20/5/2025'),
(769, 18, '20/5/2025'),
(770, 18, '20/5/2025'),
(771, 18, '20/5/2025'),
(772, 18, '20/5/2025'),
(773, 18, '20/5/2025'),
(774, 18, '20/5/2025'),
(775, 18, '20/5/2025'),
(776, 18, '20/5/2025'),
(777, 18, '20/5/2025'),
(778, 18, '20/5/2025'),
(779, 18, '20/5/2025'),
(780, 18, '20/5/2025'),
(781, 18, '20/5/2025'),
(782, 18, '20/5/2025'),
(783, 18, '20/5/2025'),
(784, 18, '20/5/2025'),
(785, 18, '20/5/2025'),
(786, 18, '20/5/2025'),
(787, 18, '20/5/2025'),
(788, 18, '20/5/2025'),
(789, 18, '20/5/2025'),
(790, 18, '20/5/2025'),
(791, 18, '20/5/2025'),
(792, 18, '20/5/2025'),
(793, 18, '20/5/2025'),
(794, 18, '20/5/2025'),
(795, 18, '20/5/2025'),
(796, 18, '20/5/2025'),
(797, 18, '20/5/2025'),
(798, 18, '20/5/2025'),
(799, 18, '20/5/2025'),
(800, 18, '20/5/2025'),
(801, 18, '20/5/2025'),
(802, 18, '20/5/2025'),
(803, 18, '20/5/2025'),
(804, 18, '20/5/2025'),
(805, 18, '20/5/2025'),
(806, 18, '20/5/2025'),
(807, 18, '20/5/2025');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas`
--

CREATE TABLE `ofertas` (
  `Idoferta` int(3) NOT NULL,
  `Idplato` int(4) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `Puntos` int(15) NOT NULL,
  `Descuento` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ofertas`
--

INSERT INTO `ofertas` (`Idoferta`, `Idplato`, `Descripcion`, `Puntos`, `Descuento`) VALUES
(11, 23, ' Canjea tu Sushi roll GRATIS!!', 950, '100%'),
(12, 33, ' Consigue una bebida GRATIS!!', 300, '100%'),
(14, 123, ' Prueba un postre japonés completamente GRATIS!!', 1500, '100%'),
(15, 343, 'Combo especial con sushi, bebida y postre GRATIS!!', 3500, '100%');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `Idpedido` int(3) NOT NULL,
  `Monto` int(5) NOT NULL,
  `Fecha` date NOT NULL,
  `Idusuario` int(3) NOT NULL,
  `notas` varchar(100) NOT NULL,
  `entrega` varchar(15) DEFAULT NULL,
  `estado` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`Idpedido`, `Monto`, `Fecha`, `Idusuario`, `notas`, `entrega`, `estado`) VALUES
(112, 40, '2025-05-13', 18, '', 'domicilio', 'Entregado'),
(113, 15, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(114, 29, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(115, 15, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(116, 21, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(117, 6, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(118, 22, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(119, 6, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(120, 6, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(121, 15, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(122, 11, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(123, 22, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(124, 28, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(125, 15, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(126, 22, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(127, 67, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(128, 17, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(129, 48, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(130, 22, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(131, 22, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(132, 17, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(133, 17, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(134, 22, '2025-05-14', 18, '', 'recoger', 'Entregado'),
(135, 22, '2025-05-15', 18, '', 'recoger', 'Entregado'),
(136, 14, '2025-05-15', 18, '', 'domicilio', 'Entregado'),
(137, 22, '2025-05-15', 18, '', 'recoger', 'Entregado'),
(138, 17, '2025-05-15', 18, '', 'recoger', 'Entregado'),
(139, 17, '2025-05-15', 18, '', 'recoger', 'Entregado'),
(140, 38, '2025-05-15', 18, '', 'recoger', 'Entregado'),
(141, 22, '2025-05-15', 18, '', 'recoger', 'Entregado'),
(142, 22, '2025-05-15', 18, '', 'recoger', 'Entregado'),
(143, 22, '2025-05-15', 18, '', 'recoger', 'Entregado'),
(144, 6, '2025-05-16', 18, '', 'recoger', 'Entregado'),
(145, 17, '2025-05-16', 18, '', 'Recoger', 'Entregado'),
(146, 14, '2025-05-20', 18, '', 'Domicilio', 'Entregado'),
(147, 184, '2025-05-20', 19, '', 'Domicilio', 'En preparacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntos`
--

CREATE TABLE `puntos` (
  `Puntos` int(10) NOT NULL,
  `Idusuario` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `puntos`
--

INSERT INTO `puntos` (`Puntos`, `Idusuario`) VALUES
(34180, 18),
(1944, 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `Idreserva` int(3) NOT NULL,
  `Hora` varchar(5) NOT NULL,
  `Fecha` date NOT NULL,
  `Npersonas` int(2) NOT NULL,
  `Nmesa` int(2) NOT NULL,
  `Idusuario` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`Idreserva`, `Hora`, `Fecha`, `Npersonas`, `Nmesa`, `Idusuario`) VALUES
(74, '15:16', '2025-05-21', 3, 0, 18),
(75, '23:00', '2025-06-17', 6, 3, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Idusuario` int(3) NOT NULL,
  `Usuario` varchar(25) NOT NULL,
  `Contraseña` varchar(250) NOT NULL,
  `Nombreape` text NOT NULL,
  `Correo` text NOT NULL,
  `Telefono` int(9) NOT NULL,
  `Direccion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Idusuario`, `Usuario`, `Contraseña`, `Nombreape`, `Correo`, `Telefono`, `Direccion`) VALUES
(18, 'jaimech9', '$2y$10$reszo2wQWIT70q.PeT5ApOlE9Rph8d6vnxaPDSLoVaPt96vGr9Jqm', 'Jaime Corrillero Holgado', 'jaime@email.com', 929999999, 'calle jardines n18 sierra de fuentes'),
(19, 'jaimech92', '$2y$10$Q9mNZfqHyJXLYa8Els1VCOycPpk.2xu9wlRxm9AB8G7wsLDIObgeO', 'Jaime Holgado', 'jaime2@email.com', 3333333, 'calle 2 nº3');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `canjeos`
--
ALTER TABLE `canjeos`
  ADD PRIMARY KEY (`IdCanje`),
  ADD KEY `Idusuario` (`IdUsuario`),
  ADD KEY `IdOferta` (`IdOferta`);

--
-- Indices de la tabla `carta`
--
ALTER TABLE `carta`
  ADD PRIMARY KEY (`Idplato`);

--
-- Indices de la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  ADD PRIMARY KEY (`Iddetalle`),
  ADD KEY `detallepepe` (`IdPedido`),
  ADD KEY `idplato` (`idplato`);

--
-- Indices de la tabla `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`idlogin`),
  ADD KEY `fk_idusuariolog` (`idusuario`);

--
-- Indices de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD PRIMARY KEY (`Idoferta`),
  ADD KEY `fk_idplato` (`Idplato`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`Idpedido`),
  ADD KEY `fk_pedidos_usuario` (`Idusuario`);

--
-- Indices de la tabla `puntos`
--
ALTER TABLE `puntos`
  ADD KEY `fk_puntos_iduser` (`Idusuario`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`Idreserva`),
  ADD KEY `fk_reserva_iduser` (`Idusuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Idusuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `canjeos`
--
ALTER TABLE `canjeos`
  MODIFY `IdCanje` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  MODIFY `Iddetalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=272;

--
-- AUTO_INCREMENT de la tabla `logins`
--
ALTER TABLE `logins`
  MODIFY `idlogin` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=808;

--
-- AUTO_INCREMENT de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `Idoferta` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `Idpedido` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `Idreserva` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Idusuario` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `canjeos`
--
ALTER TABLE `canjeos`
  ADD CONSTRAINT `IdOferta` FOREIGN KEY (`IdOferta`) REFERENCES `ofertas` (`Idoferta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Idplato` FOREIGN KEY (`IdPlato`) REFERENCES `carta` (`Idplato`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Idusuario` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`Idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  ADD CONSTRAINT `detallepedido_ibfk_1` FOREIGN KEY (`idplato`) REFERENCES `carta` (`Idplato`),
  ADD CONSTRAINT `detallepepe` FOREIGN KEY (`IdPedido`) REFERENCES `pedidos` (`Idpedido`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `logins`
--
ALTER TABLE `logins`
  ADD CONSTRAINT `fk_idusuariolog` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`Idusuario`);

--
-- Filtros para la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD CONSTRAINT `fk_idplato` FOREIGN KEY (`Idplato`) REFERENCES `carta` (`Idplato`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedidos_usuario` FOREIGN KEY (`Idusuario`) REFERENCES `usuarios` (`Idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `puntos`
--
ALTER TABLE `puntos`
  ADD CONSTRAINT `fk_puntos_iduser` FOREIGN KEY (`Idusuario`) REFERENCES `usuarios` (`Idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fk_reserva_iduser` FOREIGN KEY (`Idusuario`) REFERENCES `usuarios` (`Idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
