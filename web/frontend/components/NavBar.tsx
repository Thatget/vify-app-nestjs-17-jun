import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarBootstrap(props: any) {
    const handleSelect = (eventKey: string) => {
        props.parentCallback(eventKey)
        alert(`selected ${eventKey}`);
    }
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">StoreName</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link eventKey="/GettingStarted" href="#home">Getting Started</Nav.Link>
                        <Nav.Link eventKey="/Quotes" href="#home">Quotes</Nav.Link>
                        <Nav.Link eventKey="/product" href="#features">Products</Nav.Link>
                        <Nav.Link eventKey="/Setting" href="#pricing">Setting</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}

export default NavbarBootstrap;