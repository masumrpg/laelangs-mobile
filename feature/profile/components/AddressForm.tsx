import { useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { KeyboardAvoidingView, Image, Text, Platform } from "react-native";
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent, ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
} from "@/components/ui/select/select-actionsheet";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { CreditCardIcon } from "lucide-react-native";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import React from "react";

interface AddressFormProps {
    buttonText: string;
}

export default function AddressForm({ buttonText }: AddressFormProps) {
    const [showActionsheet, setShowActionsheet] = useState(false);
    const handleClose = () => setShowActionsheet(false);
    return (
        <>
            <Button variant={"outline"} size={"xs"} className={"rounded-full"} onPress={() => setShowActionsheet(true)}>
                <ButtonText>{buttonText}</ButtonText>
            </Button>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
                    <ActionsheetBackdrop />
                    <ActionsheetContent className="">
                        <ActionsheetDragIndicatorWrapper>
                            <ActionsheetDragIndicator />
                        </ActionsheetDragIndicatorWrapper>
                        <VStack className="w-full pt-5">
                            <HStack space="md" className="justify-center items-center">
                                <Box className="w-[50px] h-full px-2 border border-solid border-outline-300 rounded-sm">
                                    <Image
                                        source={{ uri: "https://i.imgur.com/UwTLr26.png" }}
                                        resizeMode="contain"
                                        className="flex-1"
                                    />
                                </Box>
                                <VStack className="flex-1">
                                    <Text className="font-bold">Mastercard</Text>
                                    <Text>Card ending in 2345</Text>
                                </VStack>
                            </HStack>
                            <FormControl className="mt-[36px]">
                                <FormControlLabel>
                                    <FormControlLabelText>
                                        Confirm security code
                                    </FormControlLabelText>
                                </FormControlLabel>
                                <Input className="w-full">
                                    <InputSlot>
                                        <InputIcon as={CreditCardIcon} className="ml-2" />
                                    </InputSlot>
                                    <InputField placeholder="CVC/CVV" />
                                </Input>
                                <Button onPress={handleClose} className="mt-3">
                                    <ButtonText className="flex-1">Pay $1000</ButtonText>
                                </Button>
                            </FormControl>
                        </VStack>
                    </ActionsheetContent>
                </Actionsheet>
            </KeyboardAvoidingView>
        </>
    );
}