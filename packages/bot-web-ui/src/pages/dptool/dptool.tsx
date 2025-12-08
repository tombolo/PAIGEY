import { useState, useCallback, useEffect } from "react";

const DTraderAutoLogin = ({
    dtraderUrl = 'https://deriv-dtrader.vercel.app/dtrader',
    appId = 70344,
    defaultSymbol = '1HZ100V',
}: {
    dtraderUrl?: string;
    appId?: number;
    defaultSymbol?: string;
}) => {
    const [iframeSrc, setIframeSrc] = useState('');

    const buildIframeUrl = useCallback((token: string, loginId: string) => {
        const clientAccountsStr = localStorage.getItem('clientAccounts') || '{}';
        let currency = 'USD';

        try {
            const clientAccounts = JSON.parse(clientAccountsStr);
            const account = clientAccounts[loginId];
            if (account?.currency) {
                currency = account.currency;
            }
        } catch (error) {
            console.error('Error parsing clientAccounts:', error);
        }

        const params = new URLSearchParams({
            acct1: loginId,
            token1: token,
            cur1: currency,
            lang: 'EN',
            app_id: appId.toString(),
            chart_type: 'area',
            interval: '1t',
            symbol: defaultSymbol,
            trade_type: 'over_under',
        });

        const url = `${dtraderUrl}?${params.toString()}`;
        setIframeSrc(url);
    }, [dtraderUrl, appId, defaultSymbol]);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const activeLoginId = localStorage.getItem('active_loginid');

        if (authToken && activeLoginId) {
            buildIframeUrl(authToken, activeLoginId);
        } else {
            setIframeSrc(`${dtraderUrl}?chart_type=area&interval=1t&symbol=${defaultSymbol}&trade_type=over_under`);
        }
    }, [buildIframeUrl, dtraderUrl, defaultSymbol]);

    useEffect(() => {
        const checkAuthAndUpdate = () => {
            const authToken = localStorage.getItem('authToken');
            const activeLoginId = localStorage.getItem('active_loginid');

            if (authToken && activeLoginId) {
                buildIframeUrl(authToken, activeLoginId);
            } else {
                setIframeSrc(`${dtraderUrl}?chart_type=area&interval=1t&symbol=${defaultSymbol}&trade_type=over_under`);
            }
        };

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'authToken' || e.key === 'active_loginid' || e.key === 'clientAccounts') {
                checkAuthAndUpdate();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        const interval = setInterval(checkAuthAndUpdate, 2000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [buildIframeUrl, dtraderUrl, defaultSymbol]);

    if (!iframeSrc) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Loading DTrader...</p>
            </div>
        );
    }

    return (
        <iframe
            src={iframeSrc}
            title="DTrader"
            style={{ width: '100%', height: '100%', border: 'none' }}
        />
    );
};