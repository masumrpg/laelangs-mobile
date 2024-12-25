import React from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";

export default function FilterModal({
                                        visible,
                                        filters,
                                        setFilters,
                                        onApply,
                                        onClose,
                                    }: {
    visible: boolean;
    filters: { q: string; minPrice: string; maxPrice: string; };
    setFilters: React.Dispatch<
        React.SetStateAction<{
            q: string;
            minPrice: string;
            maxPrice: string;
        }>
    >;
    onApply: () => void;
    onClose: () => void;
}) {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <Box style={styles.modalContainer}>
                <Box style={styles.modalContent}>
                    <Box className="text-lg font-bold mb-4">
                        <Text>Filter Lelang</Text>
                    </Box>
                    <TextInput
                        placeholder="Min Price"
                        keyboardType="numeric"
                        value={formatRupiah(filters.minPrice)}
                        onChangeText={(text) =>
                            setFilters((prev) => ({ ...prev, minPrice: text }))
                        }
                        className="border border-gray-300 rounded-lg p-3 mb-4"
                    />
                    <TextInput
                        placeholder="Max Price"
                        keyboardType="numeric"
                        value={filters.maxPrice}
                        onChangeText={(text) =>
                            setFilters((prev) => ({ ...prev, maxPrice: text }))
                        }
                        className="border border-gray-300 rounded-lg p-3 mb-4"
                    />
                    <Box className="gap-y-4">
                        <Button onPress={onApply}>
                            <Text className={"text-white"}>Apply Filters</Text>
                        </Button>
                        <Button onPress={onClose}>
                            <Text className={"text-white"}>Close</Text>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
    },
});
