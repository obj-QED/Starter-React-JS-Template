import { ActionIcon, Menu, rem } from '@mantine/core';
import { useTheme, themeConfig } from '@/config/theme';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import { memo, useCallback, useState, useEffect } from 'react';

type ThemeType = 'light' | 'dark' | 'auto';

interface ThemeOption {
  value: ThemeType;
  label: string;
  icon: typeof IconSun;
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: 'light', label: 'Светлая', icon: IconSun },
  { value: 'dark', label: 'Темная', icon: IconMoon },
  { value: 'auto', label: 'Системная', icon: IconDeviceDesktop },
];

const ICON_SIZE = {
  button: rem(18),
  menu: rem(14),
} as const;

// Простая версия ThemeToggle без Mantine
const SimpleThemeToggle = () => {
  const { currentTheme, setTheme } = useTheme();

  const handleThemeChange = useCallback(
    (theme: ThemeType) => {
      setTheme(theme);
    },
    [setTheme],
  );

  const CurrentIcon = THEME_OPTIONS.find((option) => option.value === currentTheme)?.icon || IconDeviceDesktop;

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => handleThemeChange(currentTheme === 'light' ? 'dark' : 'light')}
        style={{
          background: 'none',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Переключить тему"
      >
        <CurrentIcon style={{ width: 18, height: 18 }} />
      </button>
    </div>
  );
};

// Компонент-обертка для безопасного использования Mantine
const SafeMantineWrapper = ({ children }: { children: React.ReactNode }) => {
  const [hasMantineProvider, setHasMantineProvider] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли Mantine CSS переменные в DOM
    const checkMantineProvider = () => {
      const root = document.documentElement;
      const hasMantineVars = root.style.getPropertyValue('--mantine-color-scheme') !== '';
      setHasMantineProvider(hasMantineVars);
    };

    checkMantineProvider();
    
    // Проверяем еще раз после небольшой задержки
    const timer = setTimeout(checkMantineProvider, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!hasMantineProvider) {
    return <SimpleThemeToggle />;
  }

  return <>{children}</>;
};

// Mantine версия ThemeToggle
const MantineThemeToggle = () => {
  const { currentTheme, setTheme } = useTheme();

  const handleThemeChange = useCallback(
    (theme: ThemeType) => {
      setTheme(theme);
    },
    [setTheme],
  );

  const CurrentIcon = THEME_OPTIONS.find((option) => option.value === currentTheme)?.icon || IconDeviceDesktop;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="outline" size="lg" aria-label="Переключить тему">
          <CurrentIcon style={{ width: ICON_SIZE.button, height: ICON_SIZE.button }} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
          <Menu.Item
            key={value}
            leftSection={<Icon style={{ width: ICON_SIZE.menu, height: ICON_SIZE.menu }} />}
            onClick={() => handleThemeChange(value)}
          >
            {label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export const ThemeToggle = memo(function ThemeToggle() {
  // Используем Mantine компоненты только если Mantine тема включена
  if (themeConfig.useMantineTheme) {
    return (
      <SafeMantineWrapper>
        <MantineThemeToggle />
      </SafeMantineWrapper>
    );
  }
  
  return <SimpleThemeToggle />;
});
