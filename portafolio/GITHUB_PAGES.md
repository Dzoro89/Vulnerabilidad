# Publicar el portafolio en GitHub Pages

El sitio es estático: HTML, CSS, JavaScript, imágenes y PDF. GitHub almacena el código y GitHub Pages aloja la página web.

## Identidad y estructura

Nombre profesional elegido: `david-hernandez-ti`.

Título del sitio: **David Hernández | Liderazgo TI y Ciberseguridad**.

La rama principal es `main` y el sitio se guarda dentro de `portafolio/`. La dirección publicada se obtiene de la configuración real de GitHub Pages durante cada despliegue. También es posible usar un dominio propio.

Al renombrar el repositorio, ejecutar otra publicación desde Actions. El flujo actualiza la URL canónica, la imagen social y el sitemap con la nueva dirección.

## Publicación

1. Crear el repositorio en la cuenta correcta. Con GitHub Free, el repositorio debe ser público para usar Pages.
2. Subir `portafolio/dist/`, `portafolio/scripts/prepare_pages.py` y `.github/workflows/pages.yml` manteniendo sus rutas.
3. En el repositorio, abrir **Settings > Pages > Build and deployment** y seleccionar **GitHub Actions** como origen.
4. Abrir **Actions > Publish portfolio to GitHub Pages > Run workflow** sobre `main`.
5. Esperar a que finalice el flujo y abrir la URL que devuelve el paso de despliegue.

Los siguientes cambios publicados en `main` actualizarán la web automáticamente. El flujo prepara una copia de `dist/`, actualiza la URL canónica, la imagen social y el sitemap para la dirección real, y publica solo los archivos de la web.

Esta copia excluye la identidad y configuración del alojamiento original y cualquier credencial. La audiencia del alojamiento original se conserva.

## Laboratorios

Las fichas están en `portafolio/dist/laboratorios/`. Su estado debe corresponder al trabajo real:

- VMware: en desarrollo; pruebas y evidencias pendientes.
- Active Directory y GPO: práctica planificada.
- Wazuh: práctica planificada.

Para marcar un laboratorio como completado, documentar arquitectura, pasos, prueba, resultado y evidencias; después actualizar la tarjeta en `portafolio/dist/index.html` y su ficha Markdown. Las evidencias se pueden guardar en `portafolio/dist/laboratorios/evidencias/` y enlazar desde la tarjeta.

## Certificaciones

La sección está preparada en `portafolio/dist/index.html`. Cada credencial debe incluir nombre oficial, emisor, fecha, vigencia si aplica y enlace de verificación. Los cursos Lexmark y los estudios académicos se muestran como formación; no se atribuyen certificaciones profesionales sin confirmación.

## Preparar archivos para otro hosting

También se pueden generar archivos para un servidor que aloje contenido estático:

```bash
python3 portafolio/scripts/prepare_pages.py --output salida-web --url https://tu-dominio.example
```

Subir el contenido de `salida-web/` a la carpeta pública del hosting. No se requieren Node, Python ni una base de datos en el servidor; Python se usa solo para preparar la copia.

## Documentación oficial

- [Qué es GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
- [Publicación automática](https://docs.github.com/en/get-started/start-your-journey/deploying-your-website-automatically).
- [Configurar el origen de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
