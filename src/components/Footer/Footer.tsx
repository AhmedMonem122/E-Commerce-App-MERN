import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentIcon from "@mui/icons-material/Payment";
import trustCartLogo from "../../assets/images/svgs/trust-cart-logo.svg";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        color: "#1A202C",
        py: 6,
        borderTop: "1px solid #E2E8F0",
      }}
    >
      <Container maxWidth="xl">
        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {[
            { icon: <LocalShippingIcon />, text: "Free Shipping" },
            { icon: <SecurityIcon />, text: "Secure Payment" },
            { icon: <SupportAgentIcon />, text: "24/7 Support" },
            { icon: <PaymentIcon />, text: "Easy Returns" },
          ].map((feature, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Box sx={{ color: "#3B82F6", mb: 1 }}>{feature.icon}</Box>
                <Typography variant="body1">{feature.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 6 }} />

        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Logo and About */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component="img"
              src={trustCartLogo}
              alt="TrustCart"
              sx={{ height: 40, mb: 2 }}
            />
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your trusted destination for quality products and exceptional
              shopping experience. We prioritize trust, convenience, and
              customer satisfaction.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Links
            </Typography>
            {["Home", "Products", "Categories", "About Us"].map((text) => (
              <Link
                key={text}
                href="#"
                underline="none"
                sx={{
                  color: "#1A202C",
                  display: "block",
                  mb: 1,
                  "&:hover": { color: "#3B82F6" },
                }}
              >
                {text}
              </Link>
            ))}
          </Grid>

          {/* Customer Service */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Customer Service
            </Typography>
            {["Contact Us", "FAQs", "Returns", "Shipping"].map((text) => (
              <Link
                key={text}
                href="#"
                underline="none"
                sx={{
                  color: "#1A202C",
                  display: "block",
                  mb: 1,
                  "&:hover": { color: "#3B82F6" },
                }}
              >
                {text}
              </Link>
            ))}
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Connect With Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Follow us on social media for updates, deals, and inspiration.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[
                { icon: <FacebookIcon />, color: "#1877F2" },
                { icon: <TwitterIcon />, color: "#1DA1F2" },
                { icon: <InstagramIcon />, color: "#E4405F" },
                { icon: <LinkedInIcon />, color: "#0A66C2" },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: social.color,
                    "&:hover": { bgcolor: `${social.color}15` },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Divider sx={{ mb: 2 }} />
        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "#718096" }}
        >
          © {new Date().getFullYear()} TrustCart. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
