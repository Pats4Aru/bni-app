export const Link = ({ children, ...props }) => <a {...props}>{children}</a>;
export const MemoryRouter = ({ children }) => <>{children}</>;
export const useLocation = () => ({
    pathname: '/members/user',
    search: '',
    hash: '',
    state: {
        Name: "Test",
        Profession: "Salesmen",
        Company: "NVIDIA",
        Email: "test@gmail.com",
        Phone: "9195555555"
    }, 
    key: 'default',
})