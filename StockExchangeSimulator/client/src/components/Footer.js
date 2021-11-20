// import React from 'react';
// import GitHubIcon from '@material-ui/icons/GitHub';
// import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
// import { BottomNavigation } from '@mui/material';
// import './Footer.css';
// const FooterComponent = ()=>{
//     return(
//         <div id="FooterContainer">
//         <div id="Contact-Container">
//         <AccountBalanceIcon/>
//             <span className="content">
//                 <h6>Address</h6>
//                 {/* <p>PES University,<br/> RR Campus <br/>100 Feet Ring Road,<br/>BSK III Stage,<br/>
//                     Bangalore-560085<br/>
//                     Karnataka, India</p> */}
//                     <p>PES University</p>
//             </span>
//             <span className="content nopadding">
//                 <h6>Connect</h6>
//                 <p>
//                     <a href = "mailto:abhiadi110@gmail.com@gmail.com">stockexchange@gmail.com</a>
//                     <br/><LinkedInIcon className='SocialIcons'/>
//                     <GitHubIcon className='SocialIcons'/>
//                     <FacebookIcon className="SocialIcons"/>
//                 </p>
//             </span>
//         </div>
//         <div id="Copyright">
//             <h6 id="CopyNotice">Copyright &copy; 2021. All rights reserved.</h6>
//         </div>
//         </div>
//     )
// }

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';

function Copyright() {
  return (
    <Typography variant="body2" color="text-white">
      {'Copyright © '}
      <Link style={{color:"white"}}>
        Stock Exchange Simulation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50vh',
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
          <LinkedInIcon className='SocialIcons'/>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="//github.com/Adithya-S-Bhat/Stock-Exchange-Simulator-DBMS_Project" style={{color:"white"}} target='_blank'><GitHubIcon className='SocialIcons'/></Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <FacebookIcon className="SocialIcons"/>&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <Copyright />
          <br/>
          <Typography variant="body2" color="text-white">Made with &nbsp;<span style={{color:"red"}}>❤</span> &nbsp; by Abhishek Aditya BS, Adithya MS and Abhiram Puranik.</Typography>
        </Container>
        
      </Box>
    </Box>
  );
}
// export default StickyFooter;