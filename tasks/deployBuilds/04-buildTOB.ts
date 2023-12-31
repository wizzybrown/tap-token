import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { IDeployerVMAdd } from 'tapioca-sdk/dist/ethers/hardhat/DeployerVM';
import { TapiocaOptionBroker__factory } from '../../typechain';

export const buildTOB = async (
    hre: HardhatRuntimeEnvironment,
    paymentTokenBeneficiary: string,
    signer: string,
): Promise<IDeployerVMAdd<TapiocaOptionBroker__factory>> => {
    const deploymentName = 'TapiocaOptionBroker';
    return {
        contract: (await hre.ethers.getContractFactory(
            deploymentName,
        )) as TapiocaOptionBroker__factory,
        deploymentName,
        args: [
            // To be replaced by VM
            hre.ethers.constants.AddressZero,
            // To be replaced by VM
            hre.ethers.constants.AddressZero,
            // To be replaced by VM
            hre.ethers.constants.AddressZero,
            paymentTokenBeneficiary,
            604800, // 7 days
            signer,
        ],
        dependsOn: [
            {
                argPosition: 0,
                deploymentName: 'TapiocaOptionLiquidityProvision',
            },
            { argPosition: 1, deploymentName: 'OTAP' },
            { argPosition: 2, deploymentName: 'TapOFT' },
        ],
    };
};
