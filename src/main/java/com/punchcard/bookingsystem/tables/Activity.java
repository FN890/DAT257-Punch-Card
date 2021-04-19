package com.punchcard.bookingsystem.tables;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Activity {

    //Gjorde så att aktivitet har ett id-nummer (funkar bäst så med implementation).
    //Skapade även en sekvensgenerator till den så att id skapas automatiskt utan att behöva säga vilket
    //id-nummer en ny aktivitet ska ha /Viktor
    @Id
    @SequenceGenerator(
            name = "activity_sequence",
            sequenceName = "activity_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "activity_sequence"
    )
    private Long id;

    @Column(
            unique = true
    )
    private String name ;

    private Integer price ;
    private Integer maxSize ;

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings;

    public Activity() {
    }

    public Activity(String name, Integer price, Integer maxSize) {
        this.name = name ;
        this.price = price ;
        this.maxSize = maxSize ;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getMaxSize() {
        return maxSize ;
    }

    public void setMaxSize() {
        this.maxSize = maxSize ;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

