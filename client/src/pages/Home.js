import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from '@mui/material';
import {
  VolunteerActivism,
  RequestPage,
  AdminPanelSettings,
  TrendingUp,
  People,
  Favorite,
  ArrowForward,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import APITest from '../components/APITest';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: <VolunteerActivism sx={{ fontSize: 40 }} />,
      title: t('home.features.easy_donation.title'),
      description: t('home.features.easy_donation.description'),
      action: () => navigate('/register'),
      buttonText: t('start_donating'),
      color: '#4f46e5',
    },
    {
      icon: <RequestPage sx={{ fontSize: 40 }} />,
      title: t('home.features.request_items.title'),
      description: t('home.features.request_items.description'),
      action: () => navigate('/register'),
      buttonText: t('start_requesting'),
      color: '#10b981',
    },
    {
      icon: <AdminPanelSettings sx={{ fontSize: 40 }} />,
      title: t('home.features.smart_matching.title'),
      description: t('home.features.smart_matching.description'),
      action: () => navigate('/browse-donations'),
      buttonText: t('explore_matches'),
      color: '#f59e0b',
    },
  ];

  const stats = [
    { icon: <People />, value: '10,000+', label: t('home.stats.active_users') },
    { icon: <VolunteerActivism />, value: '5,000+', label: t('home.stats.donations_made') },
    { icon: <Favorite />, value: '15,000+', label: t('home.stats.lives_impacted') },
    { icon: <TrendingUp />, value: '95%', label: t('home.stats.match_success_rate') },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div {...fadeInUp}>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  {t('home.hero.title')}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}
                >
                  {t('home.hero.subtitle')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        bgcolor: 'grey.100',
                      },
                    }}
                  >
                    {t('get_started')}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/browse-donations')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {t('explore')}
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      width: 300,
                      height: 300,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '8rem',
                    }}
                  >
                    🤝
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card
                      sx={{
                        textAlign: 'center',
                        p: 3,
                        height: '100%',
                        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          width: 56,
                          height: 56,
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Typography variant="h4" component="div" fontWeight={700} color="primary">
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              {t('home.features.title')}
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
            >
              {t('home.features.subtitle')}
            </Typography>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
                        },
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Avatar
                          sx={{
                            bgcolor: feature.color,
                            width: 64,
                            height: 64,
                            mb: 3,
                          }}
                        >
                          {feature.icon}
                        </Avatar>
                        <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                          {feature.description}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ p: 3, pt: 0 }}>
                        <Button
                          variant="contained"
                          endIcon={<ArrowForward />}
                          onClick={feature.action}
                          fullWidth
                          sx={{ bgcolor: feature.color }}
                        >
                          {feature.buttonText}
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* API Test Section - Demo for Hackathon */}
      <Box sx={{ py: 6, bgcolor: 'primary.light', color: 'white' }}>
        <Container maxWidth="md">
          <APITest />
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box textAlign="center">
              <Typography variant="h3" component="h2" gutterBottom fontWeight={600}>
                {t('home.cta.title')}
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                {t('home.cta.subtitle')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    bgcolor: 'secondary.main',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'secondary.dark',
                    },
                  }}
                >
                  {t('join_now')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/browse-donations')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {t('learn_more')}
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
