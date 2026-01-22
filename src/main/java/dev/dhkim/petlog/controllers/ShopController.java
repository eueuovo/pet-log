package dev.dhkim.petlog.controllers;

import ch.qos.logback.core.model.Model;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/shop")
public class ShopController {
    @RequestMapping(value = "main", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getShop(ModelAndView modelAndView, Model model){
        modelAndView.setViewName("shop/main");
        return modelAndView;
    }
}
