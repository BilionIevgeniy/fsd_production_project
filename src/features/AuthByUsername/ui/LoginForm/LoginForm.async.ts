import { LoginFormProps } from 'features/AuthByUsername/ui/LoginForm/LoginForm';
import React, { FC } from 'react';

export const LoginFormAsync = React.lazy<FC<LoginFormProps>>(() => import('./LoginForm'));
