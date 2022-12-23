import React from 'react';
import {
  InputField as BaseInputField,
  SelectField as BaseSelectField,
  SliderField as BaseSliderField,
  CheckboxField as BaseCheckboxField,
  ActionIcon as BaseActionIcon,
  Button,
  CSS,
} from '../../shared-components';

const fieldCSS: CSS = {
  '& *': {
    color: '$tonal200',
    backgroundColor: 'transparent',
    '&:focus': {
      borderColor: '$tonal100',
    },
    outline: 'none !important',
    '&[data-state=checked]': {
      backgroundColor: 'transparent',
      borderColor: '$tonal200',
      '& svg > polyline': {
        color: '$tonal200',
      },
    },
    '&[class$="state-error"]': {
      color: 'white',
      borderColor: 'white',
    },
  },
};

export const InputField: React.FC<
  React.ComponentProps<typeof BaseInputField>
> = (props: any) => {
  const { css, ...rest } = props;
  return <BaseInputField css={{ ...fieldCSS, ...css }} {...rest} />;
};

export const SelectField: React.FC<
  React.ComponentProps<typeof BaseSelectField>
> = (props: any) => {
  const { css, ...rest } = props;
  return <BaseSelectField css={{ ...fieldCSS, ...css }} {...rest} />;
};

export const SliderField: React.FC<
  React.ComponentProps<typeof BaseSliderField>
> = (props: any) => {
  const { css, ...rest } = props;
  return <BaseSliderField css={{ ...fieldCSS, ...css }} {...rest} />;
};

export const CheckboxField: React.FC<
  React.ComponentProps<typeof BaseCheckboxField>
> = (props: any) => {
  const { css, ...rest } = props;
  return <BaseCheckboxField css={{ ...fieldCSS, ...css }} {...rest} />;
};

export const DarkButton: React.FC<React.ComponentProps<typeof Button>> = (
  props: any
) => {
  const { css, theme, ...rest } = props as any;
  return (
    <Button
      theme='neutral'
      css={{
        '&, &:hover, &:active, &:focus': {
          bg: 'transparent !important',
          border: '1px solid $tonal200 !important',
          color: '$tonal200 !important',
        },
        ...css,
      }}
      {...rest}
    />
  );
};

export const DarkActionIcon: React.FC<
  React.ComponentProps<typeof BaseActionIcon>
> = (props: any) => {
  const { css, appearance, ...rest } = props as any;
  return (
    <BaseActionIcon
      appearance='outline'
      theme='neutral'
      css={{
        bg: 'transparent',
        border: '1px solid $tonal200',
        color: '$tonal200',
        ...css,
      }}
      {...rest}
    />
  );
};
