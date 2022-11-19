import { Box, Flex, Grid, GridItem, HStack, Kbd, Skeleton, Switch, Text, VStack } from "@chakra-ui/react";

import Health from "@/lib/health";

const RandomSuspense = () => {
    const options = [Health.Healthy(), Health.Unhealthy(""), Health.Custom()];

    return (
        <>
            <Grid gap={6} templateColumns="auto 1fr auto" my={5}>
                <GridItem>
                    <Text color="gray.400">
                        <Kbd>Alt</Kbd> + <Kbd>e</Kbd> で通常生成とランダム生成を切り替え
                    </Text>
                </GridItem>
                <GridItem />
                <GridItem>
                    <Skeleton w={100} h="40px" borderRadius="0.375rem" />
                </GridItem>
            </Grid>
            <Grid gap={1} templateColumns="auto 1fr auto" h={50}>
                <GridItem>
                    <Skeleton w="40px" h="40px" mr={2} borderRadius="0.375rem" />
                </GridItem>
                <GridItem>
                    <Skeleton w="100%" h="40px" />
                </GridItem>
                <GridItem>
                    <Skeleton w="40px" h="40px" ml={2} borderRadius="0.375rem" />
                </GridItem>
            </Grid>
            <HStack mt={6}>
                <Skeleton mx={2} fontSize="xl">
                    体調
                </Skeleton>
                {options.map(value => {
                    const key = value.toString(),
                        text = Health.localize(value);

                    return (
                        <Skeleton key={key}>
                            <Box px={5} py={3} borderRadius="md">
                                {text}
                            </Box>
                        </Skeleton>
                    );
                })}
            </HStack>
            <VStack alignItems="end" mt={6} spacing={2}>
                <Skeleton w="100%" h="40px" mb={0} />
                <Skeleton w="calc(100% - var(--chakra-space-10))">
                    <Text fontSize="sm">Loading...</Text>
                </Skeleton>
            </VStack>
            <Box mt={4}>
                <Flex align="center" dir="row">
                    <Skeleton mx={2} fontSize="xl">
                        備考
                    </Skeleton>
                    <Skeleton w="50px">
                        <Switch size="lg" />
                    </Skeleton>
                </Flex>
                <Skeleton w="100%" h={20} mt={2} borderRadius="md" />
                <Skeleton w="100%" mt={2}>
                    <Text fontSize="sm">Loading...</Text>
                </Skeleton>
            </Box>
            <Box my={6}>
                <Skeleton fontSize="md">プレビュー</Skeleton>
                <Skeleton h={100} mt={2} p={4} />
            </Box>
        </>
    );
};

export default RandomSuspense;
