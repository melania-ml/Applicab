import Card from '@mui/material/Card';
import { styled, darken } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth0RegisterTab from './tabs/Auth0RegisterTab';
import FirebaseRegisterTab from './tabs/FirebaseRegisterTab';
import JWTRegisterTab from './tabs/JWTRegisterTab';

const Root = styled('div')(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
    theme.palette.primary.dark,
    0.5
  )} 100%)`,
  color: theme.palette.primary.contrastText,

  '& .Register-leftSection': {
    width: '50%'
  },

  '& .Register-rightSection': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function ForgotPassword() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isConfirmationMessage, setIsConfirmationMessage] = useState(false)

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <Root className="flex flex-col flex-auto items-center justify-center shrink-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-full shadow-2xl overflow-hidden h-full"
      >
        <Card
          className="Register-leftSection flex flex-col w-full items-center justify-center shadow-0"
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full max-w-400">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                <img src="assets/images/logos/login.svg" alt="logo" />
              </div>
            </motion.div>

            {/* <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              className="w-full mb-32"
            >
              <Tab
                icon={
                  <img
                    className="h-40 p-4 bg-black rounded-12"
                    src="assets/images/logos/jwt.svg"
                    alt="firebase"
                  />
                }
                className="min-w-0"
                label="JWT"
              />
              <Tab
                icon={
                  <img className="h-40" src="assets/images/logos/firebase.svg" alt="firebase" />
                }
                className="min-w-0"
                label="Firebase"
              />
              <Tab
                icon={<img className="h-40" src="assets/images/logos/auth0.svg" alt="auth0" />}
                className="min-w-0"
                label="Auth0"
              />
            </Tabs> */}

            {selectedTab === 0 && <JWTRegisterTab isConfirmationMessage={isConfirmationMessage} setIsConfirmationMessage={setIsConfirmationMessage} />}
            {/* {selectedTab === 1 && <FirebaseRegisterTab />}
            {selectedTab === 2 && <Auth0RegisterTab />} */}
          </CardContent>

          {!isConfirmationMessage && <div className="flex flex-col items-center justify-center pb-32">
            <div>
              <Link className="font-normal align-center" to="/login">
                Login
              </Link>
            </div>
          </div>
          }
        </Card>

        <div className="Register-rightSection hidden md:flex flex-1 items-center justify-center p-64">
          <div className="max-w-500">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <Typography variant="h3" color="inherit" className="font-semibold leading-tight">
                AppliCab crée et maintient <br />
                le lien entre l'avocat et son <br />
                client
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography variant="subtitle1" color="inherit" className="mt-32">
                Plateforme de suivi des dossiers et de gestion du cabinet, pensée par des avocats pour des avocats
              </Typography>
            </motion.div>
            <br />
            <br />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Button
                variant="contained"
                color="secondary"
                className="p-30"
              >
                Demander une démo
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Root>
  );
}

export default ForgotPassword;
