import {SunIcon, MoonIcon} from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

const ThemeToggler = () => {
    const {theme, setTheme} = useTheme();
    
    return (
        <div>
            {theme === 'dark' ? (
                <SunIcon className='h-6 w-6 cursor-pointer' onClick={() => setTheme('light')}/>
            ) : (
                <MoonIcon className='h-6 w-6 cursor-pointer'onClick={() => setTheme('dark')}/>
            )}
        </div>
    );
};

export default ThemeToggler;