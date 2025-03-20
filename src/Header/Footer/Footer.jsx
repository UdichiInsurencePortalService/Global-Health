import React from 'react';
import "./Footer.css";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';



const Footer = () => {
  return (
    <MDBFooter className='text-center footer'>
      <MDBContainer className='p-4 '>
        {/* <section className='mb-4'>
          {['twitter', 'google', 'instagram', 'linkedin-in',].map((icon, index) => (
            <MDBBtn outline color="light" floating className='m-1' href='javascript:void(0)' role='button' key={index}>
              <MDBIcon fab icon={icon} />
            </MDBBtn>
          ))}
        </section> */}

        <section>
          <form action=''>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-2'><strong>Sign Up For Our Newsletter :</strong></p>
              </MDBCol>
              <MDBCol md='5' start>
                <MDBInput contrast={true} type='email' className='mb-4' placeholder='Enter your Email' />
              </MDBCol>
              <MDBCol size="auto">
                <MDBBtn outline color='light' type='submit' className='mb-4'>Subscribe</MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </section>

        <section className='mb-4 para'>
          <p>
          "Click the link below to explore more:"
          </p>
        </section>

        <section>
  <MDBRow className='copyright'>
    {[
      [
        { name: 'Home', url: 'https://example.com' },
        { name: 'About', url: 'https://about.com' },
        { name: 'Claims', url: 'https://services.com' },
        { name: 'Log In', url: 'https://services.com' },
        { name: 'Contact', url: 'https://contact.com' },


      ],
      [
        { name: 'Car insurance', url: 'https://google.com' },
        { name: 'Life insurance', url: 'https://yahoo.com' },
        { name: 'Health insurance', url: 'https://bing.com' },
        { name: 'Auto Insurance', url: 'https://duckduckgo.com' }
      ],
      [
        { name: 'Commercial Insurance', url: 'https://facebook.com' },
        { name: 'Liability Insurance ', url: 'https://twitter.com' },
        { name: 'Property Insurance ', url: 'https://instagram.com' },
        { name: 'Policy Details', url: 'https://linkedin.com' }
      ],
      [
        { name: 'FAQ', url: 'https://github.com' },
        { name: 'Company Imformation', url: 'https://gitlab.com' },
        { name: 'Terms & Conditin ', url: 'https://bitbucket.org' },
        { name: 'Privacy Policy', url: 'https://codepen.io' }
      ]
    ].map((links, index) => (
      <MDBCol lg='3' md='6' className='mb-4 mb-md-0' key={index}>
        <h5 className='text-uppercase'></h5>
        <ul className='list-unstyled mb-0'>
          {links.map((link, num) => (
            <li key={num}>
              <a href={link.url}  target='_blank' rel='noopener noreferrer'>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </MDBCol>
    ))}
  </MDBRow>
</section>
<section className='icone'>
          {['twitter', 'google', 'instagram', 'linkedin-in',].map((icon, index) => (
            <MDBBtn outline color="light" floating className='m-1' href='javascript:void(0)' role='button' key={index}>
              <MDBIcon fab icon={icon} />
            </MDBBtn>
          ))}
        </section>

      </MDBContainer>

      <div className='text-center p-3 footer2'>
        © 2025 Copyright: 
        <a className='text-black' href='https://mdbootstrap.com/'> Global Health & Allied Insurance  </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;