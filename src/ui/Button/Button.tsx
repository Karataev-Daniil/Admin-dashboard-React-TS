import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './Button.module.css'

type ButtonVariant = 'minimal' | 'primary' | 'secondary' | 'unstyled'

type CommonProps = {
    children: React.ReactNode
    className?: string
    variant?: ButtonVariant
    disabled?: boolean
}

type ButtonProps =
    |   (CommonProps & {
            to?: undefined
            href?: undefined
            external?: false
            onClick?: React.MouseEventHandler<HTMLButtonElement>
        } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    |   (CommonProps & {
            href: string
            external?: boolean
            onClick?: React.MouseEventHandler<HTMLAnchorElement>
        } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    |   (CommonProps & {
            to: string
            onClick?: React.MouseEventHandler<HTMLAnchorElement>
        })

const Button = ({
    to,
    href,
    external = false,
    onClick,
    children,
    variant = 'minimal',
    className = '',
    disabled = false,
    ...props
}: ButtonProps) => {
    const classNames = [
        styles.btn,
        styles[variant],
        disabled ? styles.disabled : '',
        className
    ]
    .filter(Boolean)
    .join(' ')

    if (href || external) {
        return (
            <a
                href={disabled ? undefined : href}
                className={classNames}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                onClick={disabled ? e => e.preventDefault() : onClick}
                {...props}
            >
                {children}
            </a>
        )
    }

    if (to) {
        return (
            <RouterLink
                to={disabled ? '#' : to}
                className={classNames}
                onClick={disabled ? e => e.preventDefault() : onClick}
            >
                {children}
            </RouterLink>
        )
    }

    return (
        <button
            type="button"
            className={classNames}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
