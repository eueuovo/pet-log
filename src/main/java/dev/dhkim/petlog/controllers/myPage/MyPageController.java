package dev.dhkim.petlog.controllers.myPage;

import dev.dhkim.petlog.dto.user.PetDto;
import dev.dhkim.petlog.dto.user.SessionUser;
import dev.dhkim.petlog.entities.user.AddressEntity;
import dev.dhkim.petlog.entities.user.PersonalUserEntity;
import dev.dhkim.petlog.entities.user.PetEntity;
import dev.dhkim.petlog.entities.user.UserEntity;
import dev.dhkim.petlog.results.MyPageResult;
import dev.dhkim.petlog.services.myPage.MyPageService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/my")
public class MyPageController {
    private final MyPageService myPageService;


    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMyPage(ModelAndView modelAndView,
                                  @SessionAttribute(value = "sessionUser", required = false) SessionUser sessionUser) {
        if (sessionUser == null) {
            modelAndView.setViewName("/user/login");
            return modelAndView;
        }
        modelAndView.setViewName("myPage/my");
        Pair<MyPageResult, UserEntity> user = this.myPageService.getUser(sessionUser.getUserId());
        Pair<MyPageResult, PersonalUserEntity> personalUser = this.myPageService.getPersonalUser(sessionUser.getUserId());
        Pair<MyPageResult, AddressEntity> address = this.myPageService.getAddress(sessionUser.getUserId());
        Pair<MyPageResult, PetEntity> primaryPet = this.myPageService.getPrimaryPet(sessionUser.getUserId());
        Pair<MyPageResult, List<PetEntity>> pets = this.myPageService.getPets(sessionUser.getUserId());
        if (user.getLeft() != MyPageResult.SUCCESS ||
                personalUser.getLeft() != MyPageResult.SUCCESS ||
                address.getLeft() != MyPageResult.SUCCESS) {
            modelAndView.setViewName("/user/login");
            return modelAndView;
        }


        List<PetEntity> readPets = pets.getRight();
        if (readPets == null) {
            readPets = new ArrayList<>();
        }
        modelAndView.addObject("user", user.getRight());
        modelAndView.addObject("personalUser", personalUser.getRight());
        modelAndView.addObject("address", address.getRight());
        modelAndView.addObject("primaryPet", primaryPet.getRight());
        modelAndView.addObject("pets", readPets);
        return modelAndView;
    }

    @RequestMapping(value = "/pet/delete", method = DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<String, Object> deletePet(@RequestParam(value = "petId") int petId,
                                         @SessionAttribute(value = "sessionUser", required = false) SessionUser sessionUser) {
        MyPageResult result = this.myPageService.deletePet(petId, sessionUser.getUserId());
        Map<String, Object> response = new HashMap<>();
        response.put("result", result.name());
        return response;
    }

    @RequestMapping(value = "/pet/registration", method = POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<String, Object> insertPet(@SessionAttribute(value = "sessionUser", required = false) SessionUser sessionUser, @RequestBody PetDto pet) {
        Pair<MyPageResult, Integer> result = this.myPageService.insertPetInMyPage(sessionUser.getUserId(), pet);
        Map<String, Object> response = new HashMap<>();
        response.put("result", result.getLeft());
        response.put("petId", result.getRight());
        return response;
    }

    @RequestMapping(value = "/pet/load", method = GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<String, Object> getPet(@RequestParam(value = "petId") int petId,
                                      @SessionAttribute(value = "sessionUser", required = false) SessionUser sessionUser) {
        Pair<MyPageResult, PetEntity> pet = this.myPageService.getPet(petId, sessionUser.getUserId());
        Map<String, Object> response = new HashMap<>();
        response.put("result", pet.getLeft());
        response.put("pet", pet.getRight());
        return response;
    }

    @RequestMapping(value = "/pet/update", method = POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<String, Object> postPet(@RequestBody PetEntity pet,
                                       @SessionAttribute(value = "sessionUser", required = false) SessionUser sessionUser) {
        MyPageResult result = this.myPageService.updatePet(pet, sessionUser.getUserId());
        Map<String, Object> response = new HashMap<>();
        response.put("result", result.name());
        return response;
    }
}
