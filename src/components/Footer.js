import React from 'react';
import { Container, List, Row, Col} from 'reactstrap'

const Footer = ({ }) => {
    return (
        <Container fluid className='footer border pt-2 bg-light'>
            <Row className="justify-content-center ">
                <Col className="col-3 col-sm-2 col-xs-1 col-md-3 col-lg-4 text-center">
                    <h5>Links</h5>
                    <List type="unstyled">
                        <li><a href="#"><h6>Home</h6></a></li>
                        <li><a href="#"><h6>About</h6></a></li>
                        <li><a href="#"><h6>Menu</h6></a></li>
                    </List>
                </Col>
                <Col className="col-auto">
                    <h5>Our Address</h5>
                    <address >
                        <i className="fa fa-location-arrow fa-lg"></i> Ищите нас по всему миру<br />
                        <i className="fa fa-phone fa-lg"></i> +7 918 744 5062<br />
                        <i className="fa fa-envelope fa-lg"></i>
                        <i> smirnov.vladimir17@gmail.com</i>
                    </address>
                </Col>
                <Col className='col-6 col-sm-3 col-md-3 col-lg-4 text-center'>
                        <h5>Socials</h5>
                        <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                        <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                        <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col className='col-auto'>
                    <p>Copyright USSR Reborn 2022 </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;