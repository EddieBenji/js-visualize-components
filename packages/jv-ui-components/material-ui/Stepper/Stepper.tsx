import { forwardRef, PropsWithChildren } from 'react';
import {
    Stepper as MuiStepper,
    StepperProps as MuiStepperProps
} from '@mui/material';

export const Stepper = forwardRef<HTMLDivElement, PropsWithChildren<MuiStepperProps>>(({
    className, children, ...rest
}, ref) => {

    return (
        <MuiStepper
            ref={ref}
            className={`jv-mStepper ${className} mui`}
            {...rest}
        >
            {children}
        </MuiStepper>
    )

})
