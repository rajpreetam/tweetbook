import { FunctionComponent } from "react";
import { VariantProps, cva } from "class-variance-authority";
import {
    ExclamationTriangleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const messagesStyles = cva(
    'text-md',
    {
        variants: {
            type: {
                info: 'text-sky-500',
                error: 'text-red-500',
                warning: 'text-yellow-500',
                success: 'text-green-500',
            }
        },
        defaultVariants: {
            type: 'info'
        }
    }
);

export interface MessageProps extends VariantProps<typeof messagesStyles> {
    message: string;
};

export const Messages: FunctionComponent<MessageProps> = ({type, message, ...props}) => {
    return(
        <div className='flex items-center space-x-2'>
            {type === 'info' ? <InformationCircleIcon className='w-6 h-6 text-sky-500' /> : null}
            {type === 'error' ? <ExclamationCircleIcon className='w-6 h-6 text-red-500' /> : null}
            {type === 'warning' ? <ExclamationTriangleIcon className='w-6 h-6 text-yellow-500' /> : null}
            {type === 'success' ? <CheckCircleIcon className='w-6 h-6 text-green-500' /> : null}
            <p className={messagesStyles({type})}>{message}</p>
        </div>
    );
};