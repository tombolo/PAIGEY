import React from 'react';
import { observer } from '@deriv/stores';
import { useDBotStore } from 'Stores/useDBotStore';
import { TRecentStrategy } from './types';
import './recent-workspace.scss';
import { loadStrategy } from '../../../../../bot-skeleton/src/utils/local-storage';

const RecentWorkspace = observer(({ workspace }: { workspace: TRecentStrategy }) => {
    const { dashboard } = useDBotStore();
    const strategyIdRef = React.useRef(workspace.id);
    const strategyNameRef = React.useRef(workspace.name || 'Untitled Bot');

    const handleClick = async () => {
        console.log(`[CLICK] Loading bot: ${strategyIdRef.current}, Name: ${strategyNameRef.current}`);
        try {
            // Ensure Bot Builder tab is active so Blockly can mount and initialize the workspace
            dashboard.setActiveTab(1);

            // Wait for Blockly workspace to be ready (poll up to ~5s)
            const waitForWorkspace = () =>
                new Promise<boolean>(resolve => {
                    const start = Date.now();
                    const interval = setInterval(() => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Blockly: any = (window as unknown as { Blockly?: unknown }).Blockly;
                        const ready = !!(Blockly && (Blockly as any).derivWorkspace);
                        if (ready) {
                            clearInterval(interval);
                            resolve(true);
                        } else if (Date.now() - start > 5000) {
                            clearInterval(interval);
                            resolve(false);
                        }
                    }, 100);
                });

            const workspace_ready = await waitForWorkspace();
            if (!workspace_ready) {
                console.error('[ERROR] Blockly workspace not initialized in time');
                return;
            }

            const success = await loadStrategy(strategyIdRef.current);
            if (success) {
                console.log(`[SUCCESS] Bot loaded successfully: ${strategyNameRef.current}`);
            } else {
                console.error(`[ERROR] Failed to load bot: ${strategyNameRef.current}`);
            }
        } catch (error) {
            console.error(`[ERROR] Exception while loading bot: ${strategyNameRef.current}`, error);
        }
    };

    return (
        <div className="dbot-workspace-card-simple" onClick={handleClick} data-bot-id={workspace.id}>
            <div className="dbot-workspace-card-simple__title">
                {strategyNameRef.current}
            </div>
            <div className="dbot-workspace-card-simple__subtitle">
                Automate your trades with our free bots
            </div>
            <button className="dbot-workspace-card-simple__button">
                Load Bot
            </button>
        </div>
    );
});

export default RecentWorkspace;