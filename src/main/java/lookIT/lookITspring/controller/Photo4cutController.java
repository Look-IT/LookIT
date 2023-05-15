package lookIT.lookITspring.controller;

import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.service.Photo4CutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/collections")
@RequiredArgsConstructor
public class Photo4cutController {

    @Autowired
    private Photo4CutService photo4CutService;

    @GetMapping("/4cutphoto")
    public String PhotoFrame(@RequestParam("landmarkId") Integer landmarkId) throws Exception {
        System.out.println(landmarkId);
        return photo4CutService.getPhotoFrame(landmarkId);
    }

}
