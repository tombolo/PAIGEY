import React, { useEffect, useState } from 'react';
import { getSavedWorkspaces } from '@deriv/bot-skeleton';
import { Text, Icon } from '@deriv/components';
import { observer, useStore } from '@deriv/stores';
import { Localize } from '@deriv/translations';
import { useDBotStore } from 'Stores/useDBotStore';
import RecentWorkspace from '../dashboard/bot-list/recent-workspace';
import styles from './botlist.module.scss';

const DashboardBotList = observer(() => {
    const { load_modal } = useDBotStore();
    const { ui } = useStore();
    const { is_mobile } = ui;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStrategies = async () => {
            setIsLoading(true);
            const strategies = await getSavedWorkspaces();
            load_modal.setDashboardStrategies(strategies);
            setTimeout(() => setIsLoading(false), 800);
        };
        loadStrategies();
    }, []);

    return (
        <div className={styles.dashboard}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {isLoading ? (
                        <div className={styles.loader}>
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className={styles.skeletonCard}>
                                    <div className={styles.skeletonTitle} />
                                    <div className={styles.skeletonSubtitle} />
                                    <div className={styles.skeletonButton} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {load_modal.dashboard_strategies?.length > 0 ? (
                                <div className={styles.grid}>
                                    {load_modal.dashboard_strategies.map((workspace, index) => (
                                        <RecentWorkspace
                                            key={workspace.id}
                                            workspace={workspace}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.empty}>
                                    <div className={styles.emptyIcon}>
                                        <Icon icon="IcBox" size={is_mobile ? 48 : 64} />
                                    </div>
                                    <Text as="h3" weight="bold" align="center" className={styles.emptyTitle}>
                                        <Localize i18n_default_text="No bots found" />
                                    </Text>
                                    <Text as="p" size="xs" align="center" className={styles.emptyText}>
                                        <Localize i18n_default_text="Create your first bot to get started" />
                                    </Text>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
});

export default DashboardBotList;