import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";

const HomePage = () => {
  return (
    <Container maxW="md" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={2}
        bg="white"
        w="100%"
        m="30px 0 10px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="3xl" fontFamily="Work sans" color="blue.300">
          Talk-A-Bubble
        </Text>
      </Box>
      <Box bg={"white"} w="100%" borderRadius="lg" borderWidth="1px" p={4} color="black">
      <Tabs variant='soft-rounded' >
  <TabList mb="1em">
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
     <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
