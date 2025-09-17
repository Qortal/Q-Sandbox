import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { VOTE_ON_POLL } from "./actions/VOTE_ON_POLL.jsx";
import { CREATE_POLL } from "./actions/CREATE_POLL.jsx";
import { PUBLISH_QDN_RESOURCE } from "./actions/PUBLISH_QDN_RESOURCE.jsx";
import { PUBLISH_MULTIPLE_QDN_RESOURCES } from "./actions/PUBLISH_MULTIPLE_QDN_RESOURCES.jsx";
import { OPEN_NEW_TAB } from "./actions/OPEN_NEW_TAB.jsx";
import { SEND_COIN } from "./actions/SEND_COIN.jsx";
import { GET_WALLET_BALANCE } from "./actions/GET_WALLET_BALANCE.jsx";
import { GET_USER_ACCOUNT } from "./actions/GET_USER_ACCOUNT.jsx";
import { GET_USER_WALLET } from "./actions/GET_USER_WALLET.jsx";
import { GET_USER_WALLET_INFO } from "./actions/GET_USER_WALLET_INFO.jsx";
import { GET_LIST_ITEMS } from "./actions/GET_LIST_ITEMS.jsx";
import { ADD_LIST_ITEMS } from "./actions/ADD_LIST_ITEMS.jsx";
import { DELETE_LIST_ITEM } from "./actions/DELETE_LIST_ITEM.jsx";
import { IS_USING_PUBLIC_NODE } from "./actions/IS_USING_PUBLIC_NODE.jsx";
import { ADMIN_ACTION } from "./actions/ADMIN_ACTION.jsx";
import { SHOW_PDF_READER } from "./actions/SHOW_PDF_READER.tsx";
import { SIGN_TRANSACTION } from "./actions/SIGN_TRANSACTION.jsx";
import { DEPLOY_AT } from "./actions/DEPLOY_AT.jsx";
import { JOIN_GROUP } from "./actions/JOIN_GROUP.jsx";
import { SEND_CHAT_MESSAGE } from "./actions/SEND_CHAT_MESSAGE.jsx";
import { ENCRYPT_DATA } from "./actions/ENCRYPT_DATA.jsx";
import { DECRYPT_DATA } from "./actions/DECRYPT_DATA.jsx";
import { GET_CROSSCHAIN_SERVER_INFO } from "./actions/GET_CROSSCHAIN_SERVER_INFO.jsx";
import { GET_TX_ACTIVITY_SUMMARY } from "./actions/GET_TX_ACTIVITY_SUMMARY.jsx";
import { GET_FOREIGN_FEE } from "./actions/GET_FOREIGN_FEE.jsx";
import { GET_SERVER_CONNECTION_HISTORY } from "./actions/GET_SERVER_CONNECTION_HISTORY.jsx";
import { GET_DAY_SUMMARY } from "./actions/GET_DAY_SUMMARY.jsx";
import { UPDATE_FOREIGN_FEE } from "./actions/UPDATE_FOREIGN_FEE.jsx";
import { SET_CURRENT_FOREIGN_SERVER } from "./actions/SET_CURRENT_FOREIGN_SERVER.jsx";
import { ADD_FOREIGN_SERVER } from "./actions/ADD_FOREIGN_SERVER.jsx";
import { REMOVE_FOREIGN_SERVER } from "./actions/REMOVE_FOREIGN_SERVER.jsx";
import { CREATE_TRADE_BUY_ORDER } from "./actions/CREATE_TRADE_BUY_ORDER.jsx";
import { CREATE_TRADE_SELL_ORDER } from "./actions/CREATE_TRADE_SELL_ORDER.jsx";
import { CANCEL_TRADE_SELL_ORDER } from "./actions/CANCEL_TRADE_SELL_ORDER.jsx";
import { ENCRYPT_QORTAL_GROUP_DATA } from "./actions/ENCRYPT_QORTAL_GROUP_DATA.jsx";
import { DECRYPT_QORTAL_GROUP_DATA } from "./actions/DECRYPT_QORTAL_GROUP_DATA.jsx";
import { ENCRYPT_DATA_WITH_SHARING_KEY } from "./actions/ENCRYPT_DATA_WITH_SHARING_KEY.jsx";
import { DECRYPT_DATA_WITH_SHARING_KEY } from "./actions/DECRYPT_DATA_WITH_SHARING_KEY.jsx";
import { CREATE_AND_COPY_EMBED_LINK } from "./actions/CREATE_AND_COPY_EMBED_LINK.jsx";
import { SHOW_ACTIONS } from "./actions/SHOW_ACTIONS.jsx";
import { GET_HOSTED_DATA } from "./actions/GET_HOSTED_DATA.jsx";
import { DELETE_HOSTED_DATA } from "./actions/DELETE_HOSTED_DATA.jsx";
import { GET_ACCOUNT_DATA } from "./actions/GET_ACCOUNT_DATA.jsx";
import { GET_ACCOUNT_NAMES } from "./actions/GET_ACCOUNT_NAMES.jsx";
import { SEARCH_NAMES } from "./actions/SEARCH_NAMES.jsx";
import { GET_NAME_DATA } from "./actions/GET_NAME_DATA.jsx";
import { GET_QDN_RESOURCE_URL } from "./actions/GET_QDN_RESOURCE_URL.jsx";
import { LINK_TO_QDN_RESOURCE } from "./actions/LINK_TO_QDN_RESOURCE.jsx";
import { LIST_QDN_RESOURCES } from "./actions/LIST_QDN_RESOURCES.jsx";
import { SEARCH_QDN_RESOURCES } from "./actions/SEARCH_QDN_RESOURCES.jsx";
import { FETCH_QDN_RESOURCE } from "./actions/FETCH_QDN_RESOURCE.jsx";
import { GET_QDN_RESOURCE_STATUS } from "./actions/GET_QDN_RESOURCE_STATUS.jsx";
import { GET_QDN_RESOURCE_PROPERTIES } from "./actions/GET_QDN_RESOURCE_PROPERTIES.jsx";
import { GET_QDN_RESOURCE_METADATA } from "./actions/GET_QDN_RESOURCE_METADATA.jsx";
import { GET_BALANCE } from "./actions/GET_BALANCE.jsx";
import { GET_PRICE } from "./actions/GET_PRICE.jsx";
import { LIST_GROUPS } from "./actions/LIST_GROUPS.jsx";
import { GET_AT } from "./actions/GET_AT.jsx";
import { GET_AT_DATA } from "./actions/GET_AT_DATA.jsx";
import { LIST_ATS } from "./actions/LIST_ATS.jsx";
import { FETCH_BLOCK } from "./actions/FETCH_BLOCK.jsx";
import { FETCH_BLOCK_RANGE } from "./actions/FETCH_BLOCK_RANGE.jsx";
import { SEARCH_TRANSACTIONS } from "./actions/SEARCH_TRANSACTIONS.jsx";
import { SEARCH_CHAT_MESSAGES } from "./actions/SEARCH_CHAT_MESSAGES.jsx";
import { REGISTER_NAME } from "./actions/REGISTER_NAME.jsx";
import { UPDATE_NAME } from "./actions/UPDATE_NAME.jsx";
import { LEAVE_GROUP } from "./actions/LEAVE_GROUP.jsx";
import { INVITE_TO_GROUP } from "./actions/INVITE_TO_GROUP.jsx";
import { KICK_FROM_GROUP } from "./actions/KICK_FROM_GROUP.jsx";
import { BAN_FROM_GROUP } from "./actions/BAN_FROM_GROUP.jsx";
import { CANCEL_GROUP_BAN } from "./actions/CANCEL_GROUP_BAN.jsx";
import { ADD_GROUP_ADMIN } from "./actions/ADD_GROUP_ADMIN.jsx";
import { REMOVE_GROUP_ADMIN } from "./actions/REMOVE_GROUP_ADMIN.jsx";
import { CANCEL_GROUP_INVITE } from "./actions/CANCEL_GROUP_INVITE.jsx";

import { CREATE_GROUP } from "./actions/CREATE_GROUP.jsx";
import { UPDATE_GROUP } from "./actions/UPDATE_GROUP.jsx";
import { SELL_NAME } from "./actions/SELL_NAME.jsx";
import { CANCEL_SELL_NAME } from "./actions/CANCEL_SELL_NAME.jsx";
import { BUY_NAME } from "./actions/BUY_NAME.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ShowAction = ({ selectedAction, handleClose, myAddress }) => {
  const ActionComponent = useMemo(() => {
    switch (selectedAction?.action) {
      case "VOTE_ON_POLL":
        return VOTE_ON_POLL;
      case "CREATE_POLL":
        return CREATE_POLL;
      case "PUBLISH_QDN_RESOURCE":
        return PUBLISH_QDN_RESOURCE;
      case "PUBLISH_MULTIPLE_QDN_RESOURCES":
        return PUBLISH_MULTIPLE_QDN_RESOURCES;
      case "OPEN_NEW_TAB":
        return OPEN_NEW_TAB;
      case "SEND_COIN":
        return SEND_COIN;
      case "GET_WALLET_BALANCE":
        return GET_WALLET_BALANCE;
      case "GET_USER_ACCOUNT":
        return GET_USER_ACCOUNT;
      case "GET_USER_WALLET":
        return GET_USER_WALLET;
      case "GET_USER_WALLET_INFO":
        return GET_USER_WALLET_INFO;
      case "GET_LIST_ITEMS":
        return GET_LIST_ITEMS;
      case "ADD_LIST_ITEMS":
        return ADD_LIST_ITEMS;
      case "DELETE_LIST_ITEM":
        return DELETE_LIST_ITEM;
      case "IS_USING_PUBLIC_NODE":
        return IS_USING_PUBLIC_NODE;
      case "ADMIN_ACTION":
        return ADMIN_ACTION;
      case "SIGN_TRANSACTION":
        return SIGN_TRANSACTION;
      case "DEPLOY_AT":
        return DEPLOY_AT;
      case "JOIN_GROUP":
        return JOIN_GROUP;
      case "SEND_CHAT_MESSAGE":
        return SEND_CHAT_MESSAGE;
      case "ENCRYPT_DATA":
        return ENCRYPT_DATA;
      case "DECRYPT_DATA":
        return DECRYPT_DATA;
      case "GET_CROSSCHAIN_SERVER_INFO":
        return GET_CROSSCHAIN_SERVER_INFO;
      case "GET_TX_ACTIVITY_SUMMARY":
        return GET_TX_ACTIVITY_SUMMARY;
      case "GET_FOREIGN_FEE":
        return GET_FOREIGN_FEE;
      case "GET_SERVER_CONNECTION_HISTORY":
        return GET_SERVER_CONNECTION_HISTORY;
      case "GET_DAY_SUMMARY":
        return GET_DAY_SUMMARY;
      case "UPDATE_FOREIGN_FEE":
        return UPDATE_FOREIGN_FEE;
      case "SET_CURRENT_FOREIGN_SERVER":
        return SET_CURRENT_FOREIGN_SERVER;
      case "ADD_FOREIGN_SERVER":
        return ADD_FOREIGN_SERVER;
      case "REMOVE_FOREIGN_SERVER":
        return REMOVE_FOREIGN_SERVER;
      case "CREATE_TRADE_BUY_ORDER":
        return CREATE_TRADE_BUY_ORDER;
      case "CREATE_TRADE_SELL_ORDER":
        return CREATE_TRADE_SELL_ORDER;
      case "CANCEL_TRADE_SELL_ORDER":
        return CANCEL_TRADE_SELL_ORDER;
      case "ENCRYPT_QORTAL_GROUP_DATA":
        return ENCRYPT_QORTAL_GROUP_DATA;
      case "DECRYPT_QORTAL_GROUP_DATA":
        return DECRYPT_QORTAL_GROUP_DATA;
      case "ENCRYPT_DATA_WITH_SHARING_KEY":
        return ENCRYPT_DATA_WITH_SHARING_KEY;
      case "DECRYPT_DATA_WITH_SHARING_KEY":
        return DECRYPT_DATA_WITH_SHARING_KEY;
      case "CREATE_AND_COPY_EMBED_LINK":
        return CREATE_AND_COPY_EMBED_LINK;
      case "SHOW_ACTIONS":
        return SHOW_ACTIONS;
      case "GET_HOSTED_DATA":
        return GET_HOSTED_DATA;
      case "DELETE_HOSTED_DATA":
        return DELETE_HOSTED_DATA;
      case "GET_ACCOUNT_DATA":
        return GET_ACCOUNT_DATA;
      case "GET_ACCOUNT_NAMES":
        return GET_ACCOUNT_NAMES;
      case "SEARCH_NAMES":
        return SEARCH_NAMES;
      case "GET_NAME_DATA":
        return GET_NAME_DATA;
      case "GET_QDN_RESOURCE_URL":
        return GET_QDN_RESOURCE_URL;
      case "LINK_TO_QDN_RESOURCE":
        return LINK_TO_QDN_RESOURCE;
      case "LIST_QDN_RESOURCES":
        return LIST_QDN_RESOURCES;
      case "SEARCH_QDN_RESOURCES":
        return SEARCH_QDN_RESOURCES;
      case "FETCH_QDN_RESOURCE":
        return FETCH_QDN_RESOURCE;
      case "GET_QDN_RESOURCE_STATUS":
        return GET_QDN_RESOURCE_STATUS;
      case "GET_QDN_RESOURCE_PROPERTIES":
        return GET_QDN_RESOURCE_PROPERTIES;
      case "GET_QDN_RESOURCE_METADATA":
        return GET_QDN_RESOURCE_METADATA;
      case "GET_BALANCE":
        return GET_BALANCE;
      case "GET_PRICE":
        return GET_PRICE;
      case "LIST_GROUPS":
        return LIST_GROUPS;
      case "GET_AT":
        return GET_AT;
      case "GET_AT_DATA":
        return GET_AT_DATA;
      case "LIST_ATS":
        return LIST_ATS;
      case "FETCH_BLOCK":
        return FETCH_BLOCK;
      case "FETCH_BLOCK_RANGE":
        return FETCH_BLOCK_RANGE;
      case "SEARCH_TRANSACTIONS":
        return SEARCH_TRANSACTIONS;
      case "SEARCH_CHAT_MESSAGES":
        return SEARCH_CHAT_MESSAGES;
      case "REGISTER_NAME":
        return REGISTER_NAME;
      case "UPDATE_NAME":
        return UPDATE_NAME;
      case "LEAVE_GROUP":
        return LEAVE_GROUP;
      case "INVITE_TO_GROUP":
        return INVITE_TO_GROUP;
      case "KICK_FROM_GROUP":
        return KICK_FROM_GROUP;
      case "BAN_FROM_GROUP":
        return BAN_FROM_GROUP;
      case "CANCEL_GROUP_BAN":
        return CANCEL_GROUP_BAN;
      case "ADD_GROUP_ADMIN":
        return ADD_GROUP_ADMIN;
      case "REMOVE_GROUP_ADMIN":
        return REMOVE_GROUP_ADMIN;
      case "CANCEL_GROUP_INVITE":
        return CANCEL_GROUP_INVITE;
      case "CREATE_GROUP":
        return CREATE_GROUP;
      case "UPDATE_GROUP":
        return UPDATE_GROUP;
      case "SELL_NAME":
        return SELL_NAME;
      case "CANCEL_SELL_NAME":
        return CANCEL_SELL_NAME;
      case "BUY_NAME":
        return BUY_NAME;
      case "SHOW_PDF_READER":
        return SHOW_PDF_READER;
      default:
        return EmptyActionComponent;
    }
  }, [selectedAction?.action]);

  if (!selectedAction) return null;
  return (
    <div>
      <Dialog
        fullScreen
        open={!!selectedAction}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedAction?.action}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          <ActionComponent myAddress={myAddress} />
        </Box>
        {/* <LoadingSnackbar
          open={false}
          info={{
            message: "Loading member list with names... please wait.",
          }}
        /> */}
      </Dialog>
    </div>
  );
};

const EmptyActionComponent = () => {
  return null;
};
