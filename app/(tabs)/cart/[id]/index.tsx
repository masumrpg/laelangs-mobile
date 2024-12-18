import { useLocalSearchParams, useRouter } from "expo-router";
import BidDetailScreen from "@/feature/auction/components/BidDetailScreen";
import { useAuction, useGetAllMyBidAuctions } from "@/feature/auction/hooks/useAuctions";
import Loader from "@/components/Loader";

export default function Index() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { data: auction, isLoading } = useAuction(id as string);

    if (isLoading || !auction?.data) return <Loader />;

    const handleAdditionalBid = () => {
        router.push(`/cart/${id}/bid`);
    };

    return (
        <BidDetailScreen auction={auction.data} handleAdditionalBid={handleAdditionalBid} />
    );
}