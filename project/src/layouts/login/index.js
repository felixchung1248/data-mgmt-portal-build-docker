import { useState } from "react";
import { Route, Switch, useHistory, BrowserRouter as Router } from 'react-router-dom';
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    FormErrorMessage,
    InputRightElement,
    useToast,
    Text
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Config from "config";
import logo from 'assets/img/logo/ey.png';
import backgroundImage from 'assets/img/layout/steve-johnson-VVxQEpum11g-unsplash.jpg'; 

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState(""); // State for email error message
    const history = useHistory();
    const toast = useToast(); // Using Chakra UI's toast for notifications
    const validUsers = Config.validUsers

    const validateCredentials = () => {
        return validUsers.some(user => user.email === email && user.password === password);
    };

    function getAdminStatus(email) {
        for (let user of Config.validUsers) {
            if (user.email === email) {
                // Return the admin value if it exists, otherwise return "N"
                return user.admin || "N";
            }
        }
        return "User not found"; // or you could return null or throw an error
    }

    const handleShowClick = () => setShowPassword(!showPassword);
    const handleLogin = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        if (email.trim() === "") {
            setEmailError("Email address is required");
            setIsSubmitting(false);
            return;
        }
        if (!validateCredentials()) {
            setEmailError("Invalid email or password.");
            setPasswordError("Invalid email or password.");
            setIsSubmitting(false);
            return;
        }
        setEmailError(""); // Clear any existing errors
        setPasswordError("");
        localStorage.setItem('loginName', email);
        localStorage.setItem('admin', getAdminStatus(email))
        // setRoutes(generateRoutes(email));
        history.push('/admin');
    };

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            // height="100vh" 
            minHeight="100vh"
            backgroundColor="gray.700"
            justifyContent="center"
            // alignItems="center"
        >
            <Box as="header" p="4">
                <Flex justifyContent="flex-start" alignItems="center" width="100%" paddingX="20px"> {/* Control the logo's position independently */}
                    <img src={logo} alt='Logo' style={{ width: '35px', height: 'auto' }} />
                    <Text color="white" ml="4">Data Fabric portal demo</Text>
                </Flex>
            </Box>
            <Flex flex="1" p="20" direction="column" overflowY="auto" backgroundImage={`url(${backgroundImage})`}
            backgroundSize="100% 100%" // Stretch the image to fill the container
            backgroundRepeat="no-repeat" // Do not repeat the image
            backgroundPosition="center" // Center the image in the container
            >

                <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
                    <Avatar bg="yellow.300" />
                    <Heading color="white">Welcome</Heading>
                    <Box minW={{ base: "90%", md: "468px" }}>
                        <form onSubmit={handleLogin}>
                            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                                <FormControl isInvalid={emailError}>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                                        <Input
                                            type="email"
                                            placeholder="email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            isInvalid={Boolean(emailError)}
                                        />
                                    </InputGroup>
                                    {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            isInvalid={Boolean(passwordError)}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormHelperText textAlign="right">
                                        <Link>forgot password?</Link>
                                    </FormHelperText>
                                </FormControl>
                                <Button
                                    borderRadius={0}
                                    type="submit"
                                    variant="solid"
                                    colorScheme="yellow"
                                    width="full"
                                    isLoading={isSubmitting}
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
            {/* <Box as="footer" p="4">
        Footer Content
      </Box> */}
        </Flex>
    );
};