import React from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";

export default function LogoutDialog({ logoutHandle }: { logoutHandle: () => void }) {
    const [showAlertDialog, setShowAlertDialog] = React.useState(false);
    const handleClose = () => {
        setShowAlertDialog(false);
    };

    const handleLogout = () => {
        logoutHandle();
        setShowAlertDialog(false);
    };


    return (
        <>
            <Button onPress={() => setShowAlertDialog(true)}
                    className={"bg-red-500 rounded-full data-[active=true]:bg-red-600"}
            >
                <ButtonText>Logout</ButtonText>
            </Button>
            <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading className="text-typography-950 font-semibold" size="md">
                            Apakah anda yakin untuk keluar?
                        </Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mt-3 mb-4">
                        <Text size="sm">
                            Jika kamu keluar kamu akan login ulang.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter className="">
                        <Button
                            className={"rounded-full"}
                            variant="outline"
                            action="secondary"
                            onPress={handleClose}
                            size="sm"
                        >
                            <ButtonText>Batal</ButtonText>
                        </Button>
                        <Button
                            className={"bg-red-500 rounded-full data-[active=true]:bg-red-600"}
                            size="sm" onPress={handleLogout}>
                            <ButtonText>Keluar</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}