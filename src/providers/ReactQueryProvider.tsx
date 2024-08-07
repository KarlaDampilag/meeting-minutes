import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

export default function ReactQueryProvider(props: React.PropsWithChildren) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    )
}