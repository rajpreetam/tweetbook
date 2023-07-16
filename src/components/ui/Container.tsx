import { ComponentProps, FunctionComponent, ReactNode } from "react";

export interface ContainerProps extends ComponentProps<'div'> {
    children: ReactNode
};

export const Container: FunctionComponent<ContainerProps> = ({children, ...props}) => {
    return (
        <div className="mx-auto w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[70%]" {...props}>
            {children}
        </div>
    );
};