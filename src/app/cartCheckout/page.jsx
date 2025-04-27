import { Suspense } from 'react';
import Checkout from '@/components/Checkout';
import Loading from '@/components/Load'; // Create a simple loading component

export default function CartCheckoutPage() {
    return (
        <Suspense fallback={<Loading />}>
            <Checkout />
        </Suspense>
    );
}