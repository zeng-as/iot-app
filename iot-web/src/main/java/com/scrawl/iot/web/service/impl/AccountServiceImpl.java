package com.scrawl.iot.web.service.impl;

import com.scrawl.iot.paper.http.request.IotLoginRequest;
import com.scrawl.iot.paper.http.response.IotLoginResponse;
import com.scrawl.iot.paper.http.service.IotHttpService;
import com.scrawl.iot.web.dao.entity.Account;
import com.scrawl.iot.web.dao.mapper.AccountMapper;
import com.scrawl.iot.web.exception.BizException;
import com.scrawl.iot.web.service.AccountService;
import com.scrawl.iot.web.vo.sys.account.AccountListReqVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Description:
 * Created by as on 2018/4/20.
 */
@Service
@Slf4j
public class AccountServiceImpl implements AccountService{

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private IotHttpService iotHttpService;

    @Override
    public List<Account> list(AccountListReqVO reqVO) {
        return null;
    }

    @Override
    public boolean save(Account account) {
        IotLoginRequest request = new IotLoginRequest();
        request.setServerId(account.getServerId());
        request.setPassword(account.getPassword());
        IotLoginResponse response = iotHttpService.loginAuth(request);

        account.setToken(response.getAccessToken());
        return accountMapper.insertSelective(account) > 0;
    }

    @Override
    public boolean remove(Integer id) {
        // TODO: 有业务数据的不能删除

        return accountMapper.deleteByPrimaryKey(id) > 0;
    }

    @Override
    public Account get(Integer id) {
        return accountMapper.selectByPrimaryKey(id);
    }
}