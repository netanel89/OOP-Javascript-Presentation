import React from 'react';
import styled, { css } from 'styled-components';
import uuidv4 from 'uuid/v4';
import Flex from '../Flex';
import Curly from '../Curly';

const Wrapper = styled(Flex)`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 70px;
    background-color: #272822;
    color: #fff;
    font-size: 0.8em;
    margin: ${({ spaced }) => spaced ? '10px 0' : '0'};
    &::after{
        content: '${({ garbaged }) => garbaged ? 'X' : ''}';
        height: ${({ garbaged }) => garbaged ? '100%' : '0'};
        width: ${({ garbaged }) => garbaged ? '100%' : '0'};
        position: absolute;
        background-color: ${({ garbaged }) => garbaged ? 'rgba(0,0,0,0.95)' : 'transparent'};
        color: #E91E63;
        font-size: 8em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Block = styled(Flex)`
    border: 1px solid ${({bordered}) => bordered ? 'red' : '#ddd'};
    padding: 0 5px 5px 5px;
    flex: ${({ size }) => size};
`;

const Header = styled(Flex)`
    padding: 5px 5px;
    border-bottom: 1px solid #ccc;
`;

const Proto = styled(Flex)`
    border-top: 1px dashed #777;
    margin: 10px 0;
    padding-top: 5px;
`;

const PropName = styled(Flex)`
    margin-right: 7px;
    color: ${({ highlightColor }) => highlightColor || 'inherit'};
`;

const ObjectProp = styled(Flex)`
    justify-content: center;
`;

const MemoryItemsWrapper = styled(Flex)`
     > div{
         padding: 5px 0;

        &:not(:first-of-type){
            border-top: 1px solid #343434;
        }

     }
`;

const CodeLine = styled(Flex)`
    font-size: ${({ small }) => small ? '0.6em' : '0.8em'};
    font-weight: 100;
    margin-top: 5px;
     ${({ highlight }) => css`
        padding: ${highlight ? '1px 2px' : '0'};
        background-color: ${highlight ? '#673ab7' : 'transparent'};
     `};
`;

const ObjectMemory = ({ name, props = [], hideProto, protoValue, isCombo, highlight, highlightLinkage, highlightLinkageNoProto, isUndefined }) => (
    <Flex rowsDisplay bgColor={highlight}>
        {!isCombo && <PropName highlightColor={highlightLinkage || highlightLinkageNoProto}>{`${name}: `}</PropName>}
        {isUndefined ? <Undefined /> :
            <Flex rowsDisplay>
                <Flex>
                    <Curly empty={hideProto && props.length === 0} />
                </Flex>
                <ObjectProp className="objProp">
                    {props.map((p, i) => <Flex key={i} style={{ fontSize: '0.8em' }}>{p}</Flex>)}
                    {!hideProto && (
                        <Proto flexWrap rowsDisplay>
                            <PropName style={{ opacity: 0.6 }}>__proto__:</PropName>
                            <PropName highlightColor={highlightLinkage}>{protoValue}</PropName>
                        </Proto>)
                    }
                </ObjectProp>
                <Flex>
                    <Curly closing empty={hideProto && props.length === 0} />
                </Flex>
            </Flex>
        }
    </Flex>
);

const WrapedMemory = styled(Flex)`
    border-left: ${({ hideObject }) => hideObject ? 'none' : '1px solid #07ff00'};
    padding-left: ${({ hideObject }) => hideObject ? '0' : '5px'};
    margin-bottom: ${({ hideObject }) => hideObject ? '0' : '5px'};
`;

const FuncMemory = ({ name, props, hideObject, highlightLinkage, isCombo = true, hideProto = true, protoValue }) => (
    <WrapedMemory hideObject={hideObject}>
        <Flex rowsDisplay>
            <PropName highlightColor={highlightLinkage}>{`${name}: `}</PropName>
            <Flex>[ ƒ ]</Flex>
        </Flex>
        {!hideObject && (
            <Flex>
                <Flex>+</Flex>
                <ObjectMemory highlightLinkage={highlightLinkage} isCombo={isCombo} hideProto={hideProto} protoValue={protoValue} name={name} props={props} />
            </Flex>
        )}
    </WrapedMemory>
);

const PrimitiveMemory = ({ name, value, highlightLinkage }) => (
    <Flex rowsDisplay>
        <PropName highlightColor={highlightLinkage}>{name}: </PropName>
        {value ? <Flex>{value}</Flex> : <Undefined />}
    </Flex>
);

const Undefined = () => <Flex>_ _ _</Flex>;

const arrWithKeys = arr => arr && arr.map((item) => <Flex key={uuidv4()}>{item}</Flex>)

const Diagram = ({ global, threadItems, memoryItems, garbaged, hideExecutionContext, bordered }) => {
    const typeOfContext = global ? 'Global' : 'Local';
    return (
        <Wrapper rowsDisplay spaced={!global} garbaged={garbaged}>
            {!hideExecutionContext && (
                <Block size={1.3} bordered={bordered}>
                    <Header>
                        {`${typeOfContext} Execution Thread`}
                    </Header>
                    <Flex>
                        {arrWithKeys(threadItems)}
                    </Flex>
                </Block>
            )}
            <Block size={1} bordered={bordered}>
                <Header>{`${typeOfContext} Memory`}</Header>
                <MemoryItemsWrapper className="sagiiv">
                    {arrWithKeys(memoryItems)}
                </MemoryItemsWrapper>
            </Block>
        </Wrapper>
    )
};


Diagram.Obj = ObjectMemory;
Diagram.Func = FuncMemory;
Diagram.PrimitiveMemory = PrimitiveMemory;
Diagram.CodeLine = CodeLine;

export default Diagram;
