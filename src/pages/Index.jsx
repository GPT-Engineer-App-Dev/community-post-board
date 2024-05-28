import { Container, VStack, Box, Heading, Text, Input, Textarea, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      setPosts([...posts, newPost]);
      setNewPost({ title: "", content: "" });
    }
  };

  return (
    <Container maxW="container.lg" p={4}>
      <Box as="nav" bg="blue.500" color="white" p={4} mb={6}>
        <Heading size="lg">Public Post Board</Heading>
      </Box>

      <VStack spacing={6} align="stretch">
        <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
          <Heading size="md" mb={4}>Create a New Post</Heading>
          <Input
            placeholder="Title"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            mb={3}
          />
          <Textarea
            placeholder="Content"
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
            mb={3}
          />
          <Button type="submit" colorScheme="blue">Submit</Button>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Posts</Heading>
          {posts.length === 0 ? (
            <Text>No posts yet. Be the first to post!</Text>
          ) : (
            posts.map((post, index) => (
              <Box key={index} p={4} borderWidth={1} borderRadius="md" boxShadow="md" mb={4}>
                <Heading size="sm" mb={2}>{post.title}</Heading>
                <Text>{post.content}</Text>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;