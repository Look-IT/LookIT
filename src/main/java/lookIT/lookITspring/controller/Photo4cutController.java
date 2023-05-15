package lookIT.lookITspring.controller;

import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.service.Photo4CutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/collections")
@RequiredArgsConstructor
public class Photo4cutController {

    private final Photo4CutService photo4CutService;

    @GetMapping("/4cutphoto")
    public String PhotoFrame(@RequestParam("landmarkId") Long landmarkId) throws Exception {
        return photo4CutService.getPhotoFrame(landmarkId);
    }

}

