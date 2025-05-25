import { ActionIcon, Menu, rem } from '@mantine/core';
import { useTheme } from '@/config/theme';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import { memo, useCallback } from 'react';

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

export const ThemeToggle = memo(function ThemeToggle() {
  const { currentTheme, setTheme } = useTheme();

  const handleThemeChange = useCallback((theme: ThemeType) => {
    setTheme(theme);
  }, [setTheme]);

  const CurrentIcon = THEME_OPTIONS.find(option => option.value === currentTheme)?.icon || IconDeviceDesktop;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon 
          variant="outline" 
          size="lg" 
          aria-label="Переключить тему"
        >
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
});
