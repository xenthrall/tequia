---
title: Faro
description: Sistema de gestión para pequeñas empresas (inventario, compras, ventas y traslados entre bodegas) sin servidor propio y sobre infraestructura de costo casi cero.
kind: experiment
status: active
kicker: Gestión para negocios
hypothesis: ¿Se puede construir un sistema de gestión útil para un pequeño negocio con una infraestructura que cueste casi nada?
since: 2026-08-14
url: https://xenthrall.github.io/faro/public
repo: https://github.com/xenthrall/faro
stack: [React, TypeScript, Vite, Supabase, PostgreSQL, Tailwind CSS]
preview: dashboard
---

Faro es un sistema de gestión para pequeñas empresas, y el experimento es construirlo con infraestructura de costo cero o casi nada: aprovechar servicios gratuitos y administrados mientras alcancen, y que los costos solo crezcan cuando el uso real lo justifique.

## La idea

Faro es una aplicación estática, publicada gratis en GitHub Pages, que habla directamente con Supabase:

- **Datos y autenticación** en el plan gratuito de Supabase (PostgreSQL y Auth), que es bastante generoso.
- **Sin servidor de aplicación propio.** La seguridad vive en la base de datos, con Row Level Security: cada consulta se valida en PostgreSQL, no en un backend intermedio.

![Página de inicio de Faro publicada en GitHub Pages](./ui-inicio.png)
*Inicio · oct 2026*

## La demo

Hay una demo pública con una cuenta compartida: las credenciales ya vienen cargadas, solo hay que tocar Ingresar. Los datos son públicos, así que no hay que cargar información real.

![Login con la cuenta de demostración precargada](./ui-login-demo.png)
*Cuenta de demostración · oct 2026*

Al entrar, un hub reúne el acceso a los paneles. Hoy hay uno, el del negocio; los usuarios viven en el hub para que todos los paneles futuros compartan la misma lista.

![Hub de Faro con acceso al panel del negocio](./ui-hub.png)
*Hub · oct 2026*

## El panel del negocio

El dashboard resume el día (ventas, compras, margen) y el estado del inventario: su valor, productos bajo el mínimo y lotes por vencer.

Para corregir el stock a mano, sin pasar por una compra o una venta, hay un ajuste de existencias que también queda registrado como movimiento.

![Ajuste de existencias para agregar o descontar stock](./ui-ajustar-existencias.png)
*Ajustar existencias · oct 2026*

![Perfil del negocio con su identificación y datos de contacto](./ui-perfil-negocio.png)
*Perfil del negocio · oct 2026*

## Por dentro

- **Un modelo de datos genérico.** El primer caso de uso es una ferretería, pero nada en el esquema es específico de ese rubro. Cada entrada de producto es una capa de costo propia, así que una compra nueva nunca pisa el costo anterior y el inventario se puede valorizar de verdad.
- **El inventario se explica por movimientos.** La cantidad de cada producto en cada ubicación es la suma de su kardex, no un número que se edita a mano.
- **Un framework de paneles inspirado en Filament.** Las pantallas y los recursos (productos, compras, ventas…) se descubren por archivo: agregar uno es crear una carpeta, sin registrarlo a mano.

![Estructura de carpetas del panel del negocio, con un recurso por carpeta](./codigo-estructura.png)
*Estructura del código · oct 2026*
