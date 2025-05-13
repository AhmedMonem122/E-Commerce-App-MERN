import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import aboutUsIllustration from "../../assets/images/svgs/about-us-illustration.svg";

const AboutUsPage = () => {
  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: "#3B82F6" }} />,
      title: "Secure Shopping",
      description:
        "Your security is our top priority. We use advanced encryption to protect your data.",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#3B82F6" }} />,
      title: "24/7 Support",
      description:
        "Our dedicated support team is always here to help you with any questions.",
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#3B82F6" }} />,
      title: "Fast Delivery",
      description:
        "Quick and reliable shipping to get your products to you as soon as possible.",
    },
    {
      icon: <PaymentsIcon sx={{ fontSize: 40, color: "#3B82F6" }} />,
      title: "Secure Payments",
      description:
        "Multiple secure payment options for your convenience and peace of mind.",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 64px)" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#1E40AF",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
                About Trust Cart
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, color: "#BFDBFE" }}>
                Your Trusted Shopping Destination
              </Typography>
              <Typography variant="body1" sx={{ color: "#DBEAFE" }}>
                Trust Cart is committed to providing an exceptional shopping
                experience with a focus on quality, security, and customer
                satisfaction.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src={aboutUsIllustration}
                alt="About Us"
                sx={{
                  width: "100%",
                  maxWidth: 500,
                  display: "block",
                  mx: "auto",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h4"
              sx={{ mb: 3, color: "#1A202C", fontWeight: 600 }}
            >
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ color: "#4B5563", mb: 2 }}>
              At Trust Cart, we strive to revolutionize online shopping by
              providing a secure, convenient, and enjoyable experience for our
              customers.
            </Typography>
            <Typography variant="body1" sx={{ color: "#4B5563" }}>
              We believe in building lasting relationships with our customers
              through transparency, reliability, and exceptional service.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h4"
              sx={{ mb: 3, color: "#1A202C", fontWeight: 600 }}
            >
              Our Vision
            </Typography>
            <Typography variant="body1" sx={{ color: "#4B5563", mb: 2 }}>
              To become the most trusted e-commerce platform by consistently
              delivering value, quality, and innovation to our customers.
            </Typography>
            <Typography variant="body1" sx={{ color: "#4B5563" }}>
              We envision a future where online shopping is seamless, secure,
              and accessible to everyone.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: "white", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 6, color: "#1A202C", fontWeight: 600 }}
          >
            Why Choose Trust Cart?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    backgroundColor: "#F8FAFC",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    {feature.icon}
                    <Typography
                      variant="h6"
                      sx={{ mt: 2, mb: 1, color: "#1A202C", fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 6, color: "#1A202C", fontWeight: 600 }}
        >
          Our Values
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Customer First",
              description:
                "We prioritize our customers' needs and satisfaction in everything we do.",
            },
            {
              title: "Integrity",
              description:
                "We conduct our business with honesty, transparency, and ethical practices.",
            },
            {
              title: "Innovation",
              description:
                "We continuously improve and innovate to provide the best shopping experience.",
            },
            {
              title: "Excellence",
              description:
                "We strive for excellence in our products, service, and customer support.",
            },
          ].map((value, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "#1A202C", fontWeight: 600 }}
                >
                  {value.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {value.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsPage;
