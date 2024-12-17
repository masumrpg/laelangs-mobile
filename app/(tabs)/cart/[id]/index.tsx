import { useLocalSearchParams, useRouter } from "expo-router";
import BidDetailScreen from "@/feature/auction/components/BidDetailScreen";
import { useAuction, useMyBidAuctions } from "@/feature/auction/hooks/useAuctions";
import Loader from "@/components/Loader";

export default function Index() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { data: auction, isLoading } = useAuction(id as string);
    const { data: myBidAuctions, isLoading: isMyBidAuctions } = useMyBidAuctions();

    if (isLoading || !auction?.data || isMyBidAuctions) return <Loader />;

    console.log("My Bid Auction", myBidAuctions);

    const handleAdditionalBid = () => {
        router.push(`/cart/${id}/bid`);
    };

    return (
        <BidDetailScreen auction={auction.data} handleAdditionalBid={handleAdditionalBid} />
    );
}