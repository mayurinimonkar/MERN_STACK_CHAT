import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios"
import {useHistory} from "react-router-dom"

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [show , setShow] = useState(false)
  const toast = useToast()

  const history = useHistory();
  const handleClick =()=> setShow(!show);
  const postDetails =(pics)=>{
    setPicLoading(true);
    if(pics === undefined){
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if(pics.type === "image/jpeg" || pics.type === "image/png"){
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mern-chat-app");
      data.append("cloud_name", "db3ota0nv");
      fetch("https://api.cloudinary.com/v1_1/db3ota0nv/image/upload", {
        method: "post",
        body:data,
      }).then((res)=>res.json())
      .then(data =>{
        setPic(data.url.toString());
        console.log(data.url.toString())
        setPicLoading(false)
      }).catch((err)=>{
        console.log(err);
        setPicLoading(false)
      })
    }else{
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  }
  const submitHandler=async()=>{
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log("n,e,p,p",name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log("data",data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      
    }

  }
  return (

    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired >
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
        type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show? "text":"password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {
                show ? "Hide" :"Show"
              }
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show? "text":"password"}
            placeholder="Enter Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {
                show ? "Hide" :"Show"
              }
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic" >
        <FormLabel>Upload your picture</FormLabel>
        <Input
        type="file"
          placeholder="Upload"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button colorScheme={"blue"}
      width="100%"
      isLoading= {picLoading}
      style={{marginTop :15}}
      onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
