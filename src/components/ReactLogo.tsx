import logo from '../logo.svg';

export const ReactLogo = () => {
    return (
        <img src={logo} width='130'
            style={{
                position: 'fixed',
                top: 880,
                right: 20,
                zIndex: 999,
            }}
        />
    )
}
