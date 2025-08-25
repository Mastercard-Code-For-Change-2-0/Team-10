import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" color="primary.light" gutterBottom>
                Seva Sahayog Foundation
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'grey.300' }}>
                {t('footer.about_text')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton size="small" sx={{ color: 'grey.300', '&:hover': { color: 'primary.light' } }}>
                  <Facebook />
                </IconButton>
                <IconButton size="small" sx={{ color: 'grey.300', '&:hover': { color: 'primary.light' } }}>
                  <Twitter />
                </IconButton>
                <IconButton size="small" sx={{ color: 'grey.300', '&:hover': { color: 'primary.light' } }}>
                  <Instagram />
                </IconButton>
                <IconButton size="small" sx={{ color: 'grey.300', '&:hover': { color: 'primary.light' } }}>
                  <LinkedIn />
                </IconButton>
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography variant="h6" color="primary.light" gutterBottom>
                {t('footer.quick_links')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="/" color="grey.300" underline="hover">
                  {t('home')}
                </Link>
                <Link href="/browse-donations" color="grey.300" underline="hover">
                  {t('browse_donations')}
                </Link>
                <Link href="/browse-requests" color="grey.300" underline="hover">
                  {t('browse_requests')}
                </Link>
                <Link href="/register" color="grey.300" underline="hover">
                  {t('register')}
                </Link>
              </Box>
            </motion.div>
          </Grid>

          {/* For Donors */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" color="primary.light" gutterBottom>
                {t('footer.for_donors')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="/create-donation" color="grey.300" underline="hover">
                  {t('donate_items')}
                </Link>
                <Link href="/donor-dashboard" color="grey.300" underline="hover">
                  {t('donor_dashboard')}
                </Link>
                <Link href="#" color="grey.300" underline="hover">
                  {t('footer.donation_guidelines')}
                </Link>
                <Link href="#" color="grey.300" underline="hover">
                  {t('footer.tax_benefits')}
                </Link>
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography variant="h6" color="primary.light" gutterBottom>
                {t('footer.contact_us')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 16, color: 'grey.400' }} />
                  <Typography variant="body2" color="grey.300">
                    help@sevasahayog.org
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: 16, color: 'grey.400' }} />
                  <Typography variant="body2" color="grey.300">
                    +91 98765 43210
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: 'grey.400' }} />
                  <Typography variant="body2" color="grey.300">
                    Mumbai, Maharashtra, India
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.700' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="grey.400">
            © 2025 Seva Sahayog Foundation. {t('footer.all_rights_reserved')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" color="grey.400" underline="hover" variant="body2">
              {t('footer.privacy_policy')}
            </Link>
            <Link href="#" color="grey.400" underline="hover" variant="body2">
              {t('footer.terms_of_service')}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
