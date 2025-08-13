/* eslint-env node */
/* eslint-disable no-undef */
import path from 'path';

export default function styledComponentsCheck() {
  let styledComponentsEnabled = false;

  const formatFilePath = filePath => {
    const projectRoot = process.cwd();
    const srcPath = path.join(projectRoot, 'src');

    if (filePath.startsWith(srcPath)) {
      const relativePath = path.relative(srcPath, filePath);
      return `@/${relativePath}`;
    }

    return filePath;
  };

  return {
    name: 'styled-components-check',
    transform(code, id) {
      if (id.endsWith('.tsx') || id.endsWith('.ts')) {
        // Исключаем файлы конфигурации темы и приложений styled-components

        if (
          code.includes("from 'styled-components'") ||
          code.includes('import styled')
        ) {
          const formattedPath = formatFilePath(id);
          console.log(`🔍 Найден styled-components в файле: ${formattedPath}`);

          if (!styledComponentsEnabled) {
            console.error(
              `❌ Styled Components отключены! Файл "${formattedPath}"`
            );

            throw new Error(
              `Styled Components отключены! Файл "${formattedPath}"`
            );
          } else {
            console.log(
              `✅ Styled Components включены, использование разрешено в файле: ${formattedPath}`
            );
          }
        }
      }

      return null;
    },
  };
}
