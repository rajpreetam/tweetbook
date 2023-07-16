import { FunctionComponent } from "react";
import { VariantProps, cva } from "class-variance-authority";

const logoStyles = cva(
    'rounded-full bg-purple-500 dark:bg-purple-600 text-white flex items-center justify-center shadow-md shadow-slate-800 dark:shadow-gray-400',
    {
        variants: {
            size: {
                sm: 'h-10 w-10',
                md: 'h-12 w-12',
                lg: 'h-14 w-14',
            }
        }
    }
);

export interface LogoProps extends VariantProps<typeof logoStyles> {};

export const Logo: FunctionComponent<LogoProps> = ({size, ...props}) => {
    return (
        <div className={logoStyles({size})}>
            <p className={`font-logo tracking-widest ${size==='sm' ? 'text-xl': ''} ${size==='md' ? 'text-2xl': ''} ${size==='lg' ? 'text-3xl': ''}`}>Tb</p>
        </div>
    );
};