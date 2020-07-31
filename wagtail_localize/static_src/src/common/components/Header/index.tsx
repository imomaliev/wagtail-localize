import React, { FunctionComponent } from 'react';
import Icon from '../Icon';

interface HeaderButtonActionProps {
    label: string;
    onClick: () => void;
    title?: string;
    classes?: string[];
    icon?: string;
}

export const HeaderButtonAction: FunctionComponent<HeaderButtonActionProps> = ({
    label,
    onClick,
    title,
    classes,
    icon
}) => {
    let classNames = ['button'];

    if (classes) {
        classNames = classNames.concat(classes);
    }

    return (
        <button
            className={classNames.join(' ')}
            title={title}
            onClick={onClick}
        >
            {icon && <Icon name={icon} />} {label}
        </button>
    );
};

interface HeaderLinkActionProps {
    label: string;
    href: string;
    title?: string;
    classes?: string[];
    icon?: string;
}

export const HeaderLinkAction: FunctionComponent<HeaderLinkActionProps> = ({
    label,
    href,
    title,
    classes,
    icon
}) => {
    let classNames = ['button'];

    if (classes) {
        classNames = classNames.concat(classes);
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames.join(' ')}
            title={title}
        >
            {icon && <Icon name={icon} />} {label}
        </a>
    );
};

interface HeaderMetaProps {
    key: string;
    value: string | React.ReactFragment;
    icon?: string;
}

export const HeaderMeta: FunctionComponent<HeaderMetaProps> = ({
    key,
    value,
    icon
}) => {
    return (
        <li className={`header-meta--${key}`}>
            {icon && <Icon name={icon} />} {value}
        </li>
    );
};

interface HeaderDropdownLinkOption {
    label: string;
    href: string;
}

interface HeaderMetaDropdownProps {
    key: string;
    label: string;
    options: HeaderDropdownLinkOption[];
    icon?: string;
    title?: string;
    classes?: string[];
}

export const HeaderMetaDropdown: FunctionComponent<HeaderMetaDropdownProps> = ({
    key,
    label,
    options,
    icon,
    title,
    classes
}) => {
    let classNames = ['c-dropdown', 't-inverted'];

    if (classes) {
        classNames = classNames.concat(classes);
    }

    let items = options.map(({ label, href }) => {
        return (
            <li className="c-dropdown__item ">
                <a href={href} aria-label="" className="u-link is-live">
                    {label}
                </a>
            </li>
        );
    });

    return (
        <HeaderMeta
            key={key}
            icon={icon}
            value={
                <div
                    className={classNames.join(' ')}
                    data-dropdown=""
                    style={{ display: 'inline-block' }}
                >
                    <a
                        href="javascript:void(0)"
                        aria-label={title}
                        className="c-dropdown__button u-btn-current"
                    >
                        {label}
                        <div
                            data-dropdown-toggle=""
                            className="o-icon c-dropdown__toggle c-dropdown__togle--icon [ icon icon-arrow-down ]"
                        >
                            <Icon name="arrow-down" />
                            <Icon name="arrow-up" />
                        </div>
                    </a>
                    <div className="t-dark">
                        <ul className="c-dropdown__menu u-toggle  u-arrow u-arrow--tl u-background">
                            {items}
                        </ul>
                    </div>
                </div>
            }
        />
    );
};

interface HeaderProps {
    title: string;
    subtitle?: string;
    icon?: string;
    merged?: boolean;
    tabbed?: boolean;
    actions?: React.ReactNode;
    meta?: React.ReactNode;
}

const Header: FunctionComponent<HeaderProps> = ({
    title,
    subtitle,
    icon,
    merged,
    tabbed,
    actions,
    meta
}) => {
    let classNames = [];
    let rowClassNames = ['row'];

    if (merged) {
        classNames.push('merged');
    }

    if (tabbed) {
        classNames.push('tab-merged');
    } else {
        rowClassNames.push('nice-padding');
    }

    // Wrap subtitle with <span>
    let subtitleWrapped = <></>;
    if (subtitle) {
        subtitleWrapped = <span>{subtitle}</span>;
    }

    let actionsElement = <></>;
    if (actions) {
        actionsElement = (
            <div className="right">
                {actions}
            </div>
        );
    }

    let metaElement = <></>;
    if (meta) {
        metaElement = (
            <ul className="row header-meta">
                {meta}
            </ul>
        );
    }

    return (
        <header className={classNames.join(" ")}>
            {/* TODO {% block breadcrumb %}{% endblock %}*/}
            <div className={rowClassNames.join(" ")}>
                <h1 className="left col header-title" style={{textTransform: 'none'}}> {/* TODO: Move style */}
                    {icon && <Icon name={icon} className="header-title-icon" />}
                    {title} {subtitleWrapped}
                </h1>
                {actionsElement}
            </div>
            {metaElement}
        </header>
    );
};

export default Header;